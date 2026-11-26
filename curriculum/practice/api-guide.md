# Document a paginated API

An integration engineer needs to export every item in a collection. The fictional service returns two items per page and an opaque cursor. The client currently treats every successful response as the final page. Write an HTTP example, a matching response and instructions for requesting the next page. Specify what ends iteration and what to do when a page must be retried.

## Starter

~~~~markdown
# List items

GET /items

Response

Next page?
~~~~

## Hint

Walk through two requests with pencil and paper. A page containing exactly two items could still be the final page.

## Worked solution

~~~~markdown
# Export all items

Request the first page without a cursor.

```http
GET /items?limit=2 HTTP/1.1
Host: api.example.org
```

```json
{"items":[{"id":"a"},{"id":"b"}],"next_cursor":"page-2"}
```

Pass the returned cursor unchanged in `GET /items?limit=2&cursor=page-2`. The final sample response is `{"items":[{"id":"c"}],"next_cursor":null}`.

## Resume after interruption

Save the next cursor after storing the current page. If processing fails halfway, request the same page again and deduplicate by item ID. End when the returned cursor is null.
~~~~

## Self-check

Trace the IDs a, b and c. Interrupt processing after a, replay page one, and explain why the export still contains three distinct items.
