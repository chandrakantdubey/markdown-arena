# Designing a Notification System

A notification system is responsible for delivering messages to users across various channels, such as push notifications, SMS, and email. Designing a system that is reliable, scalable, and can handle different user preferences is a common system design challenge.

## Step 1: Requirements

*   **Functional Requirements**:
    1.  The system should be able to send notifications via multiple channels: Mobile Push, SMS, and Email.
    2.  Users should be able to configure their notification preferences (e.g., opt-out of email marketing).
    3.  Internal services should be able to trigger notifications for users.
    4.  (Optional) Support for scheduled or delayed notifications.
*   **Non-Functional Requirements**:
    1.  **High Reliability**: Notifications, especially transactional ones (e.g., payment receipts), must be delivered.
    2.  **Scalability**: The system must handle sending millions of notifications per day.
    3.  **Low Latency**: Notifications should be sent out with minimal delay.
    4.  **Extensibility**: It should be easy to add new notification channels in the future (e.g., WebSockets, Slack).

## Step 2: High-Level Design

A decoupled, microservice-based architecture is a good fit.

```mermaid
graph TD
    A[Internal Services<br>(e.g., Payments, Social)] --> B{Notification Service API};
    
    subgraph Notification System
        B -- "1. Enqueue Request" --> Q((Message Queue));
        Q --> W[Workers];
        W -- "2. Get User Prefs" --> US(User Service);
        W -- "3. Choose Provider" --> P1[Email Provider<br>(e.g., SendGrid)];
        W -- "3. Choose Provider" --> P2[SMS Provider<br>(e.g., Twilio)];
        W -- "3. Choose Provider" --> P3[Push Provider<br>(e.g., APNS/FCM)];
    end

    P1 -->|4. Send Email| UserEmail([Email]);
    P2 -->|4. Send SMS| UserSMS([SMS]);
    P3 -->|4. Send Push| UserDevice([Push]);

    style Q fill:#1b263b,stroke:#00f5d4,stroke-width:2px;
```
*   **Notification Service API**: The single entry point for other services to send notifications. It validates the request and puts it onto a message queue.
*   **Message Queue**: Decouples the API from the sending logic. This makes the system resilient (if a provider is down, messages can be retried) and allows it to handle traffic spikes.
*   **Workers**: A pool of workers consumes messages from the queue. Each worker is responsible for the logic of fetching user preferences and sending the notification via the correct third-party provider.

## Step 3: Deep Dive

### 1. API Design

The Notification Service should expose a simple API endpoint.

`POST /v1/send`

**Request Body:**
```json
{
  "userId": "user-123",
  "templateId": "payment_receipt",
  "templateData": {
    "amount": "$25.50",
    "orderId": "xyz-987"
  },
  "channels": ["email", "push"] // Optional: requested channels
}
```
Using templates (`templateId`) is better than sending raw content, as it separates the content and formatting from the triggering service.

### 2. The Fan-Out and Delivery Logic (The Worker's Job)

When a worker picks up a job from the **Message Queue**:
1.  **Fetch User Data**: It calls the User Service to get the user's contact information (email address, phone number, device tokens) and their notification preferences.
2.  **Check Preferences**: The worker checks if the user has opted out of this type of notification or channel.
3.  **Templating**: It fetches the correct template (e.g., the HTML for the `payment_receipt` email) and populates it with `templateData`.
4.  **Dispatch to Providers**: For each required channel, it formats the request for the specific third-party provider (e.g., Apple Push Notification Service, Twilio for SMS) and makes the API call.

### 3. Handling Failures and Retries

Third-party providers can fail. The system must be resilient.
*   **Retries**: If a provider API call fails with a transient error (e.g., a 5xx status code), the worker should not acknowledge the message. The message queue will then automatically re-deliver it to another worker after a visibility timeout.
*   **Exponential Backoff**: To avoid overwhelming a struggling provider, retries should use an exponential backoff strategy.
*   **Dead Letter Queue (DLQ)**: After a certain number of failed attempts, the message should be moved to a DLQ for manual inspection. This prevents a "poison pill" message from blocking the queue.

### 4. Push Notifications

Push notifications are more complex than email/SMS because they require managing device tokens.
*   **Device Registration**: When a user logs into the mobile app, the app gets a unique device token from the OS (APNS/FCM) and sends it to your backend.
*   **Token Storage**: Your backend must store a list of valid device tokens for each user.
*   **Handling Stale Tokens**: Providers will give feedback if a token is no longer valid (e.g., the user uninstalled the app). Your system must have a process for removing these stale tokens from your database.

## Step 4: Final Touches

*   **Database**: The Notification Service needs a database to store templates and potentially track the status of every notification sent (e.g., `pending`, `sent`, `failed`). A relational database like PostgreSQL or a document database like MongoDB would work well.
*   **Idempotency**: The API should support an idempotency key to prevent sending the same notification twice if a client retries a request due to a network error.
*   **Batching**: For high-throughput scenarios (like sending a marketing blast), workers can be optimized to batch requests to the provider APIs.