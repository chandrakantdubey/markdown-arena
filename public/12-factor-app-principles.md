# The 12-Factor App Principles

## Introduction

The Twelve-Factor App is a methodology for building software-as-a-service (SaaS) applications that are robust, scalable, and maintainable. Co-authored by developers at Heroku, these principles provide a set of best practices designed to enable applications to be built with portability and resilience when deployed to the web.

Adhering to these factors makes applications easier to deploy, scale, and manage, regardless of the cloud platform or environment they run on. For backend engineers, these are foundational principles for building modern, cloud-native applications.

## The Twelve Factors

1.  **Codebase**: *One codebase tracked in revision control, many deploys.*
    *   **Principle**: There should always be a one-to-one correlation between a codebase and an app. The codebase is tracked in a version control system like Git. Different versions may be in deployment in different environments (e.g., staging, production), but they all originate from the same codebase.
    *   **Practical Application**: Use a single Git repository for each microservice. Deployments to different environments should be done using Git branches, tags, or commit SHAs from this single repository.

2.  **Dependencies**: *Explicitly declare and isolate dependencies.*
    *   **Principle**: An application must never rely on the implicit existence of system-wide packages. It should declare all its dependencies, completely and exactly, via a dependency declaration manifest and use a dependency isolation tool.
    *   **Practical Application**: Use `package.json` (Node.js), `requirements.txt` / `pyproject.toml` (Python), or `go.mod` (Go) to manage your dependencies. Use tools like `npm`, `pip` with virtual environments, or Go modules to ensure dependency isolation.

3.  **Config**: *Store config in the environment.*
    *   **Principle**: Configuration that varies between deployments (e.g., database credentials, external service keys) should be stored in environment variables. This separates config from the code, preventing sensitive credentials from being checked into version control.
    *   **Practical Application**: Load configuration from environment variables (`process.env` in Node, `os.environ` in Python, `os.Getenv` in Go). In production, use your platform's mechanism for injecting these variables (e.g., Kubernetes ConfigMaps/Secrets). Do not hardcode credentials.

4.  **Backing Services**: *Treat backing services as attached resources.*
    *   **Principle**: A backing service is any service the app consumes over the network (database, message queue, cache). The app should make no distinction between local and third-party services. Resources should be attachable and detachable via configuration.
    *   **Practical Application**: The connection string for your database or the URL for a third-party API should be provided via a configuration variable (Factor III). Your code should be able to switch from a local PostgreSQL database to a managed AWS RDS instance just by changing an environment variable, with no code changes.

5.  **Build, Release, Run**: *Strictly separate build and run stages.*
    *   **Principle**: The delivery pipeline should consist of three distinct stages:
        *   **Build stage**: Converts a code repo into an executable bundle (a "build" or container image).
        *   **Release stage**: Combines the build with the deployment's current config.
        *   **Run stage**: Runs the app in the execution environment.
    *   **Practical Application**: In a CI/CD pipeline, the "build" stage creates a Docker image. The "release" stage combines this image tag with environment-specific configuration (like a Kubernetes manifest). The "run" stage is Kubernetes starting the containers. Releases should be immutable; to make a change, you start a new build.

6.  **Processes**: *Execute the app as one or more stateless processes.*
    *   **Principle**: The application should be executed as a stateless "share-nothing" process. Any data that needs to persist must be stored in a stateful backing service (like a database or object store).
    *   **Practical Application**: Do not store user session data in server memory. Use a centralized store like Redis or a stateless mechanism like JWTs. This allows you to easily scale horizontally by adding more instances of your application.

7.  **Port Binding**: *Export services via port binding.*
    *   **Principle**: A 12-factor app should be self-contained and not rely on a runtime injection of a webserver. The web app exports its service by binding to a port and listens for requests coming in on that port.
    *   **Practical Application**: Your Express, Flask, or Go `net/http` application should start its own web server and bind to a port specified by the `PORT` environment variable. It shouldn't depend on an external process like Apache or Nginx to be runnable.

8.  **Concurrency**: *Scale out via the process model.*
    *   **Principle**: The application should be able to scale horizontally by adding more processes. Each process should be independent and share nothing. This model is simple and reliable for scaling out to handle more traffic.
    *   **Practical Application**: Design your application to be stateless (Factor VI). This allows an orchestrator like Kubernetes to simply increase the replica count of your application to handle more load.

9.  **Disposability**: *Maximize robustness with fast startup and graceful shutdown.*
    *   **Principle**: The app's processes should be disposable, meaning they can be started or stopped at a moment's notice. This facilitates fast elastic scaling and robust deployments. Processes should aim for minimal startup time and shut down gracefully.
    *   **Practical Application**: Your application should start quickly. It must also handle the `SIGTERM` signal to perform a graceful shutdown, finishing in-flight requests before exiting.

10. **Dev/Prod Parity**: *Keep development, staging, and production as similar as possible.*
    *   **Principle**: Gaps between development and production environments can lead to costly bugs. The 12-factor methodology encourages keeping the environments as similar as possible in terms of technology, backing services, and deployment processes.
    *   **Practical Application**: Use Docker and Docker Compose to run the same container images and backing services (like PostgreSQL and Redis) in development as you do in production. Avoid using different databases (like SQLite in dev and PostgreSQL in prod).

11. **Logs**: *Treat logs as event streams.*
    *   **Principle**: A 12-factor app never concerns itself with routing or storage of its output stream. Instead, it writes its event stream, unbuffered, to standard output (`stdout`). The execution environment is responsible for collecting and routing this stream.
    *   **Practical Application**: Use a logging library to write structured (JSON) logs to `stdout`. Do not write logs to files. A container orchestrator like Kubernetes will automatically collect these streams and forward them to a centralized logging platform (like ELK or Datadog).

12. **Admin Processes**: *Run admin/management tasks as one-off processes.*
    *   **Principle**: Administrative tasks, such as database migrations or running a console, should be run as one-off processes in an identical environment as the application's regular long-running processes.
    *   **Practical Application**: Package your database migration scripts within your application's container image. Run them using a one-off task runner, like `kubernetes Job` or `heroku run`, which spins up a container, runs the command, and then shuts down.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://12factor.net/" target="_blank" rel="noopener noreferrer">The 12-Factor App Official Website</a></li>
  <li><a href="https://www.heroku.com/what/12-factor-app-methodology-for-building-saas-apps" target="_blank" rel="noopener noreferrer">Heroku's Explanation of the 12-Factor App</a></li>
</ul>
</div>