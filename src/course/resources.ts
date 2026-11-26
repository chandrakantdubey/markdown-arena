export interface Resource { id: string; title: string; category: string; source: string }
export const templates: Resource[] = [
  {
    "id": "minimal-profile",
    "title": "Minimal profile",
    "category": "Career",
    "source": "# Hi, I'm [Your name]\n\n[Role] interested in [specialty]. I build [type of work] for [audience].\n\n## Current focus\n- Building: [project]\n- Learning: [topic]\n\n## Selected work\n- [Project name](https://example.com) — [your contribution and outcome]\n\n## Connect\n- [Portfolio](https://example.com)\n"
  },
  {
    "id": "developer-portfolio",
    "title": "Developer portfolio",
    "category": "Career",
    "source": "# [Your name] | Software Engineer\n\nI design and build [systems] with a focus on [quality].\n\n## Technical toolkit\n| Area | Tools |\n| --- | --- |\n| Frontend | [tools] |\n| Backend | [tools] |\n| Infrastructure | [tools] |\n\n## Featured projects\n| Project | Contribution | Evidence |\n| --- | --- | --- |\n| [Project](https://example.com) | [what you built] | [measured result] |\n\n## Currently exploring\n- [Topic]\n\n## Contact\n[Portfolio](https://example.com)\n"
  },
  {
    "id": "open-source-maintainer-profile",
    "title": "Open-source maintainer profile",
    "category": "Career",
    "source": "# [Your name]\n\nMaintainer of [project] and contributor to [community].\n\n## Projects I maintain\n- [Project](https://example.com) — [purpose and status]\n\n## How to collaborate\n- Read the contributing guide before opening a PR.\n- Discuss substantial changes in an issue first.\n\n## Availability\n[State your availability and preferred contact channel.]\n"
  },
  {
    "id": "github-badges",
    "title": "GitHub badges",
    "category": "Career",
    "source": "## Project badges\n\n[![Build status](https://img.shields.io/github/actions/workflow/status/OWNER/REPO/check.yml)](https://github.com/OWNER/REPO/actions)\n![License](https://img.shields.io/github/license/OWNER/REPO)\n\n<!-- Replace OWNER, REPO and workflow filename; remove unavailable badges. Third-party images require network access. -->\n"
  },
  {
    "id": "project-readme",
    "title": "Project README",
    "category": "Engineering",
    "source": "# [Project name]\n\n[Problem, target audience and outcome.]\n\n## Features\n- [Feature and benefit]\n\n## Quick start\n```sh\n# Add your verified installation commands here\n```\n\n## Configuration\n| Variable | Required | Purpose |\n| --- | --- | --- |\n| [NAME] | Yes | [purpose] |\n\n## Usage\n[Provide a complete working example.]\n\n## Architecture\n[Describe the components and boundaries.]\n\n## Testing\n[Commands and prerequisites.]\n\n## Contributing\n[How to submit changes.]\n\n## License\n[License name and location.]\n"
  },
  {
    "id": "api-endpoint",
    "title": "API endpoint",
    "category": "Engineering",
    "source": "# List resources\n\n`GET /v1/resources`\n\n## Authentication\nBearer token with read permission. Never commit real tokens.\n\n## Query parameters\n| Name | Type | Default |\n| --- | --- | --- |\n| limit | integer | 20 |\n| cursor | string | none |\n\n## Example\n```bash\ncurl -H \"Authorization: Bearer $API_TOKEN\" https://api.example.com/v1/resources\n```\n\n## Response\n```json\n{\"items\":[],\"next_cursor\":null}\n```\n\n## Errors\n| Status | Meaning | Client action |\n| --- | --- | --- |\n| 401 | Invalid credentials | Refresh token |\n| 429 | Rate limited | Respect Retry-After |\n| 503 | Unavailable | Retry with backoff |\n"
  },
  {
    "id": "architecture-decision-record",
    "title": "Architecture decision record",
    "category": "Engineering",
    "source": "# ADR-001: [Decision]\n\n- Status: Proposed\n- Date: YYYY-MM-DD\n- Owners: [team]\n\n## Context\n[Constraints and problem.]\n\n## Options\n| Option | Benefits | Drawbacks |\n| --- | --- | --- |\n| A | [benefit] | [risk] |\n| B | [benefit] | [risk] |\n\n## Decision\n[Chosen approach and rationale.]\n\n## Consequences\n[Costs, risks and follow-up actions.]\n\n## Revisit when\n[Measurable trigger.]\n"
  },
  {
    "id": "pull-request",
    "title": "Pull request",
    "category": "Engineering",
    "source": "## Summary\n[What changed and why?]\n\n## Changes\n- [Change]\n\n## Verification\n- [ ] Unit tests\n- [ ] Integration tests\n- [ ] Accessibility and security reviewed\n\n## Risk and rollback\n[Impact, migration requirements and rollback procedure.]\n\n## Evidence\n[Screenshots, logs or benchmark results without secrets.]\n"
  },
  {
    "id": "bug-report",
    "title": "Bug report",
    "category": "Engineering",
    "source": "## Description\n[Expected versus actual behavior.]\n\n## Environment\n- Version:\n- OS/browser:\n\n## Reproduction\n1. [Step]\n2. [Step]\n\n## Expected result\n[Expected behavior.]\n\n## Actual result\n[Observed behavior.]\n\n## Evidence\n[Redacted logs or screenshot.]\n"
  },
  {
    "id": "runbook",
    "title": "Runbook",
    "category": "Operations",
    "source": "# [Service] runbook\n\nOwner: [team] | Last reviewed: YYYY-MM-DD\n\n## Trigger\n[Alert and threshold.]\n\n## Assess\n- Check customer impact and recent changes.\n- Inspect dashboard and logs.\n\n## Mitigate\n1. [Safe reversible action]\n2. Verify the effect against the service SLO.\n\n## Escalate\n[Team, channel and escalation criteria.]\n\n## Recover\n[Validation and rollback criteria.]\n"
  },
  {
    "id": "incident-review",
    "title": "Incident review",
    "category": "Operations",
    "source": "# Incident review: [title]\n\n- Severity: [level]\n- Duration: [UTC start/end]\n\n## Impact\n[Measured customer impact.]\n\n## Timeline (UTC)\n| Time | Event |\n| --- | --- |\n| [time] | [event] |\n\n## Contributing factors\n[Evidence, not blame.]\n\n## Corrective actions\n| Action | Owner | Due | Verification |\n| --- | --- | --- | --- |\n| [action] | [team] | [date] | [check] |\n"
  },
  {
    "id": "release-notes",
    "title": "Release notes",
    "category": "Operations",
    "source": "# Release [version] — YYYY-MM-DD\n\n## Added\n- [New capability]\n\n## Changed\n- [Behavior change]\n\n## Fixed\n- [Bug resolved]\n\n## Breaking changes\n[Migration steps or None.]\n\n## Verification and rollback\n[How to validate and revert.]\n"
  },
  {
    "id": "meeting-notes",
    "title": "Meeting notes",
    "category": "Productivity",
    "source": "# [Meeting title]\n\nDate: YYYY-MM-DD | Attendees: [names]\n\n## Objective\n[Desired outcome.]\n\n## Decisions\n- [Decision and rationale]\n\n## Actions\n| Action | Owner | Due |\n| --- | --- | --- |\n| [task] | [person] | [date] |\n\n## Open questions\n- [Question]\n"
  },
  {
    "id": "study-notes",
    "title": "Study notes",
    "category": "Productivity",
    "source": "# [Topic]\n\n## Concept in my own words\n[Explanation.]\n\n## Example\n[Concrete example.]\n\n## Common mistakes\n- [Mistake and correction]\n\n## Recall questions\n- [ ] Can I explain the concept without notes?\n- [ ] Can I apply it to a new example?\n\n## Sources\n- [Reference](https://example.com)\n"
  },
  {
    "id": "technical-blog",
    "title": "Technical blog",
    "category": "Productivity",
    "source": "# [Outcome-focused title]\n\n[Who this is for and what they will learn.]\n\n## Problem\n[Context and constraints.]\n\n## Solution\n[Steps with reproducible examples.]\n\n## Trade-offs\n[Where the approach works and where it does not.]\n\n## Conclusion\n[Key takeaway and next action.]\n"
  },
  {
    "id": "mermaid-architecture",
    "title": "Mermaid architecture",
    "category": "Engineering",
    "source": "# Request flow\n\n```mermaid\nflowchart LR\n  Client --> API\n  API --> Cache\n  API --> Database\n```\n\nText alternative: the client sends requests to the API, which accesses a cache and database. Mermaid requires renderer support.\n"
  }
]
export const snippets: Resource[] = [
  {
    "id": "snippet-1",
    "title": "Installation section",
    "category": "Headings",
    "source": "## Installation\n\nDescribe the installation workflow."
  },
  {
    "id": "snippet-2",
    "title": "Installation review",
    "category": "Checklists",
    "source": "- [ ] Document installation prerequisites\n- [ ] Verify installation steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-3",
    "title": "Installation ownership",
    "category": "Tables",
    "source": "| Installation task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-4",
    "title": "Installation reference",
    "category": "Links",
    "source": "[Installation guide](./installation.md)"
  },
  {
    "id": "snippet-5",
    "title": "Installation procedure",
    "category": "Writing",
    "source": "### Installation\n\n1. Confirm prerequisites.\n2. Perform the documented installation action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-6",
    "title": "Configuration section",
    "category": "Headings",
    "source": "## Configuration\n\nDescribe the configuration workflow."
  },
  {
    "id": "snippet-7",
    "title": "Configuration review",
    "category": "Checklists",
    "source": "- [ ] Document configuration prerequisites\n- [ ] Verify configuration steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-8",
    "title": "Configuration ownership",
    "category": "Tables",
    "source": "| Configuration task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-9",
    "title": "Configuration reference",
    "category": "Links",
    "source": "[Configuration guide](./configuration.md)"
  },
  {
    "id": "snippet-10",
    "title": "Configuration procedure",
    "category": "Writing",
    "source": "### Configuration\n\n1. Confirm prerequisites.\n2. Perform the documented configuration action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-11",
    "title": "Deployment section",
    "category": "Headings",
    "source": "## Deployment\n\nDescribe the deployment workflow."
  },
  {
    "id": "snippet-12",
    "title": "Deployment review",
    "category": "Checklists",
    "source": "- [ ] Document deployment prerequisites\n- [ ] Verify deployment steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-13",
    "title": "Deployment ownership",
    "category": "Tables",
    "source": "| Deployment task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-14",
    "title": "Deployment reference",
    "category": "Links",
    "source": "[Deployment guide](./deployment.md)"
  },
  {
    "id": "snippet-15",
    "title": "Deployment procedure",
    "category": "Writing",
    "source": "### Deployment\n\n1. Confirm prerequisites.\n2. Perform the documented deployment action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-16",
    "title": "Testing section",
    "category": "Headings",
    "source": "## Testing\n\nDescribe the testing workflow."
  },
  {
    "id": "snippet-17",
    "title": "Testing review",
    "category": "Checklists",
    "source": "- [ ] Document testing prerequisites\n- [ ] Verify testing steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-18",
    "title": "Testing ownership",
    "category": "Tables",
    "source": "| Testing task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-19",
    "title": "Testing reference",
    "category": "Links",
    "source": "[Testing guide](./testing.md)"
  },
  {
    "id": "snippet-20",
    "title": "Testing procedure",
    "category": "Writing",
    "source": "### Testing\n\n1. Confirm prerequisites.\n2. Perform the documented testing action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-21",
    "title": "Troubleshooting section",
    "category": "Headings",
    "source": "## Troubleshooting\n\nDescribe the troubleshooting workflow."
  },
  {
    "id": "snippet-22",
    "title": "Troubleshooting review",
    "category": "Checklists",
    "source": "- [ ] Document troubleshooting prerequisites\n- [ ] Verify troubleshooting steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-23",
    "title": "Troubleshooting ownership",
    "category": "Tables",
    "source": "| Troubleshooting task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-24",
    "title": "Troubleshooting reference",
    "category": "Links",
    "source": "[Troubleshooting guide](./troubleshooting.md)"
  },
  {
    "id": "snippet-25",
    "title": "Troubleshooting procedure",
    "category": "Writing",
    "source": "### Troubleshooting\n\n1. Confirm prerequisites.\n2. Perform the documented troubleshooting action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-26",
    "title": "Authentication section",
    "category": "Headings",
    "source": "## Authentication\n\nDescribe the authentication workflow."
  },
  {
    "id": "snippet-27",
    "title": "Authentication review",
    "category": "Checklists",
    "source": "- [ ] Document authentication prerequisites\n- [ ] Verify authentication steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-28",
    "title": "Authentication ownership",
    "category": "Tables",
    "source": "| Authentication task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-29",
    "title": "Authentication reference",
    "category": "Links",
    "source": "[Authentication guide](./authentication.md)"
  },
  {
    "id": "snippet-30",
    "title": "Authentication procedure",
    "category": "Writing",
    "source": "### Authentication\n\n1. Confirm prerequisites.\n2. Perform the documented authentication action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-31",
    "title": "Monitoring section",
    "category": "Headings",
    "source": "## Monitoring\n\nDescribe the monitoring workflow."
  },
  {
    "id": "snippet-32",
    "title": "Monitoring review",
    "category": "Checklists",
    "source": "- [ ] Document monitoring prerequisites\n- [ ] Verify monitoring steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-33",
    "title": "Monitoring ownership",
    "category": "Tables",
    "source": "| Monitoring task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-34",
    "title": "Monitoring reference",
    "category": "Links",
    "source": "[Monitoring guide](./monitoring.md)"
  },
  {
    "id": "snippet-35",
    "title": "Monitoring procedure",
    "category": "Writing",
    "source": "### Monitoring\n\n1. Confirm prerequisites.\n2. Perform the documented monitoring action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-36",
    "title": "Backup section",
    "category": "Headings",
    "source": "## Backup\n\nDescribe the backup workflow."
  },
  {
    "id": "snippet-37",
    "title": "Backup review",
    "category": "Checklists",
    "source": "- [ ] Document backup prerequisites\n- [ ] Verify backup steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-38",
    "title": "Backup ownership",
    "category": "Tables",
    "source": "| Backup task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-39",
    "title": "Backup reference",
    "category": "Links",
    "source": "[Backup guide](./backup.md)"
  },
  {
    "id": "snippet-40",
    "title": "Backup procedure",
    "category": "Writing",
    "source": "### Backup\n\n1. Confirm prerequisites.\n2. Perform the documented backup action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-41",
    "title": "Migration section",
    "category": "Headings",
    "source": "## Migration\n\nDescribe the migration workflow."
  },
  {
    "id": "snippet-42",
    "title": "Migration review",
    "category": "Checklists",
    "source": "- [ ] Document migration prerequisites\n- [ ] Verify migration steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-43",
    "title": "Migration ownership",
    "category": "Tables",
    "source": "| Migration task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-44",
    "title": "Migration reference",
    "category": "Links",
    "source": "[Migration guide](./migration.md)"
  },
  {
    "id": "snippet-45",
    "title": "Migration procedure",
    "category": "Writing",
    "source": "### Migration\n\n1. Confirm prerequisites.\n2. Perform the documented migration action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-46",
    "title": "Contributing section",
    "category": "Headings",
    "source": "## Contributing\n\nDescribe the contributing workflow."
  },
  {
    "id": "snippet-47",
    "title": "Contributing review",
    "category": "Checklists",
    "source": "- [ ] Document contributing prerequisites\n- [ ] Verify contributing steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-48",
    "title": "Contributing ownership",
    "category": "Tables",
    "source": "| Contributing task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-49",
    "title": "Contributing reference",
    "category": "Links",
    "source": "[Contributing guide](./contributing.md)"
  },
  {
    "id": "snippet-50",
    "title": "Contributing procedure",
    "category": "Writing",
    "source": "### Contributing\n\n1. Confirm prerequisites.\n2. Perform the documented contributing action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-51",
    "title": "Accessibility section",
    "category": "Headings",
    "source": "## Accessibility\n\nDescribe the accessibility workflow."
  },
  {
    "id": "snippet-52",
    "title": "Accessibility review",
    "category": "Checklists",
    "source": "- [ ] Document accessibility prerequisites\n- [ ] Verify accessibility steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-53",
    "title": "Accessibility ownership",
    "category": "Tables",
    "source": "| Accessibility task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-54",
    "title": "Accessibility reference",
    "category": "Links",
    "source": "[Accessibility guide](./accessibility.md)"
  },
  {
    "id": "snippet-55",
    "title": "Accessibility procedure",
    "category": "Writing",
    "source": "### Accessibility\n\n1. Confirm prerequisites.\n2. Perform the documented accessibility action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-56",
    "title": "Performance section",
    "category": "Headings",
    "source": "## Performance\n\nDescribe the performance workflow."
  },
  {
    "id": "snippet-57",
    "title": "Performance review",
    "category": "Checklists",
    "source": "- [ ] Document performance prerequisites\n- [ ] Verify performance steps\n- [ ] Record the result"
  },
  {
    "id": "snippet-58",
    "title": "Performance ownership",
    "category": "Tables",
    "source": "| Performance task | Owner | Status |\n| --- | --- | --- |\n| [Task] | [Team] | Planned |"
  },
  {
    "id": "snippet-59",
    "title": "Performance reference",
    "category": "Links",
    "source": "[Performance guide](./performance.md)"
  },
  {
    "id": "snippet-60",
    "title": "Performance procedure",
    "category": "Writing",
    "source": "### Performance\n\n1. Confirm prerequisites.\n2. Perform the documented performance action.\n3. Verify the expected result.\n4. Record any deviation."
  },
  {
    "id": "snippet-61",
    "title": "bash fenced example",
    "category": "Code",
    "source": "```bash\nprintf '%s\\n' 'Hello'\n```"
  },
  {
    "id": "snippet-62",
    "title": "python fenced example",
    "category": "Code",
    "source": "```python\nprint('Hello')\n```"
  },
  {
    "id": "snippet-63",
    "title": "javascript fenced example",
    "category": "Code",
    "source": "```javascript\nconsole.log('Hello')\n```"
  },
  {
    "id": "snippet-64",
    "title": "typescript fenced example",
    "category": "Code",
    "source": "```typescript\nconst message: string = 'Hello'\n```"
  },
  {
    "id": "snippet-65",
    "title": "json fenced example",
    "category": "Code",
    "source": "```json\n{\"status\":\"ok\"}\n```"
  },
  {
    "id": "snippet-66",
    "title": "yaml fenced example",
    "category": "Code",
    "source": "```yaml\nstatus: ok\n```"
  },
  {
    "id": "snippet-67",
    "title": "sql fenced example",
    "category": "Code",
    "source": "```sql\nSELECT 1;\n```"
  },
  {
    "id": "snippet-68",
    "title": "html fenced example",
    "category": "Code",
    "source": "```html\n<p>Hello</p>\n```"
  },
  {
    "id": "snippet-69",
    "title": "css fenced example",
    "category": "Code",
    "source": "```css\np { color: inherit; }\n```"
  },
  {
    "id": "snippet-70",
    "title": "go fenced example",
    "category": "Code",
    "source": "```go\npackage main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hello\") }\n```"
  },
  {
    "id": "snippet-71",
    "title": "rust fenced example",
    "category": "Code",
    "source": "```rust\nfn main() { println!(\"Hello\"); }\n```"
  },
  {
    "id": "snippet-72",
    "title": "java fenced example",
    "category": "Code",
    "source": "```java\nclass Main { public static void main(String[] args) { System.out.println(\"Hello\"); } }\n```"
  },
  {
    "id": "snippet-73",
    "title": "c fenced example",
    "category": "Code",
    "source": "```c\n#include <stdio.h>\nint main(void) { puts(\"Hello\"); return 0; }\n```"
  },
  {
    "id": "snippet-74",
    "title": "cpp fenced example",
    "category": "Code",
    "source": "```cpp\n#include <iostream>\nint main() { std::cout << \"Hello\"; }\n```"
  },
  {
    "id": "snippet-75",
    "title": "ruby fenced example",
    "category": "Code",
    "source": "```ruby\nputs 'Hello'\n```"
  },
  {
    "id": "snippet-76",
    "title": "php fenced example",
    "category": "Code",
    "source": "```php\n<?php echo 'Hello';\n```"
  },
  {
    "id": "snippet-77",
    "title": "dockerfile fenced example",
    "category": "Code",
    "source": "```dockerfile\nFROM alpine\nCMD [\"echo\", \"Hello\"]\n```"
  },
  {
    "id": "snippet-78",
    "title": "toml fenced example",
    "category": "Code",
    "source": "```toml\nstatus = \"ok\"\n```"
  },
  {
    "id": "snippet-79",
    "title": "xml fenced example",
    "category": "Code",
    "source": "```xml\n<status>ok</status>\n```"
  },
  {
    "id": "snippet-80",
    "title": "diff fenced example",
    "category": "Code",
    "source": "```diff\n- old value\n+ new value\n```"
  },
  {
    "id": "snippet-81",
    "title": "Bold",
    "category": "Syntax",
    "source": "**Important**"
  },
  {
    "id": "snippet-82",
    "title": "Italic",
    "category": "Syntax",
    "source": "*Emphasis*"
  },
  {
    "id": "snippet-83",
    "title": "Bold and italic",
    "category": "Syntax",
    "source": "***Important emphasis***"
  },
  {
    "id": "snippet-84",
    "title": "Inline code",
    "category": "Syntax",
    "source": "Use `npm test`."
  },
  {
    "id": "snippet-85",
    "title": "Escaped asterisk",
    "category": "Syntax",
    "source": "\\*literal asterisk\\*"
  },
  {
    "id": "snippet-86",
    "title": "Escaped bracket",
    "category": "Syntax",
    "source": "\\[literal bracket\\]"
  },
  {
    "id": "snippet-87",
    "title": "Strikethrough",
    "category": "Syntax",
    "source": "~~Deprecated~~"
  },
  {
    "id": "snippet-88",
    "title": "Horizontal rule",
    "category": "Syntax",
    "source": "---"
  },
  {
    "id": "snippet-89",
    "title": "Hard line break",
    "category": "Syntax",
    "source": "First line  \nSecond line"
  },
  {
    "id": "snippet-90",
    "title": "Soft line break",
    "category": "Syntax",
    "source": "First line\nSecond line"
  },
  {
    "id": "snippet-91",
    "title": "Setext heading",
    "category": "Syntax",
    "source": "Heading\n======="
  },
  {
    "id": "snippet-92",
    "title": "Setext subheading",
    "category": "Syntax",
    "source": "Subheading\n----------"
  },
  {
    "id": "snippet-93",
    "title": "Blockquote",
    "category": "Syntax",
    "source": "> A quoted statement."
  },
  {
    "id": "snippet-94",
    "title": "Nested quote",
    "category": "Syntax",
    "source": "> Outer quote\n>> Inner quote"
  },
  {
    "id": "snippet-95",
    "title": "Ordered list",
    "category": "Syntax",
    "source": "1. First\n2. Second"
  },
  {
    "id": "snippet-96",
    "title": "Unordered list",
    "category": "Syntax",
    "source": "- First\n- Second"
  },
  {
    "id": "snippet-97",
    "title": "Nested list",
    "category": "Syntax",
    "source": "- Parent\n  - Child"
  },
  {
    "id": "snippet-98",
    "title": "Task list",
    "category": "Syntax",
    "source": "- [x] Done\n- [ ] Pending"
  },
  {
    "id": "snippet-99",
    "title": "Reference link",
    "category": "Syntax",
    "source": "[Docs][docs]\n\n[docs]: https://example.com"
  },
  {
    "id": "snippet-100",
    "title": "Autolink",
    "category": "Syntax",
    "source": "<https://example.com>"
  },
  {
    "id": "snippet-101",
    "title": "Email link",
    "category": "Syntax",
    "source": "[Email](mailto:hello@example.com)"
  },
  {
    "id": "snippet-102",
    "title": "Inline link",
    "category": "Syntax",
    "source": "[Example](https://example.com \"Example website\")"
  },
  {
    "id": "snippet-103",
    "title": "Image",
    "category": "Syntax",
    "source": "![Architecture overview](./architecture.svg)"
  },
  {
    "id": "snippet-104",
    "title": "Linked image",
    "category": "Syntax",
    "source": "[![Preview](./preview.png)](https://example.com)"
  },
  {
    "id": "snippet-105",
    "title": "Footnote",
    "category": "Syntax",
    "source": "Claim.[^note]\n\n[^note]: Supporting context."
  },
  {
    "id": "snippet-106",
    "title": "Collapsible section",
    "category": "Syntax",
    "source": "<details>\n<summary>More information</summary>\n\nAdditional context.\n\n</details>"
  },
  {
    "id": "snippet-107",
    "title": "HTML comment",
    "category": "Syntax",
    "source": "<!-- Private authoring note: still visible in source -->"
  },
  {
    "id": "snippet-108",
    "title": "Literal backtick",
    "category": "Syntax",
    "source": "``Use `code` here``"
  },
  {
    "id": "snippet-109",
    "title": "Indented code",
    "category": "Syntax",
    "source": "    echo hello"
  },
  {
    "id": "snippet-110",
    "title": "Pipe escape",
    "category": "Syntax",
    "source": "| Value |\n| --- |\n| A \\| B |"
  },
  {
    "id": "snippet-111",
    "title": "Table alignment",
    "category": "Syntax",
    "source": "| Left | Center | Right |\n| :--- | :---: | ---: |\n| A | B | 1 |"
  },
  {
    "id": "snippet-112",
    "title": "Link anchor",
    "category": "Syntax",
    "source": "[Jump to setup](#setup)\n\n## Setup"
  },
  {
    "id": "snippet-113",
    "title": "Image reference",
    "category": "Syntax",
    "source": "![Diagram][diagram]\n\n[diagram]: ./diagram.png"
  },
  {
    "id": "snippet-114",
    "title": "Definition list (extension)",
    "category": "Syntax",
    "source": "Term\n: Definition"
  },
  {
    "id": "snippet-115",
    "title": "Math (renderer extension)",
    "category": "Syntax",
    "source": "$$E = mc^2$$"
  },
  {
    "id": "snippet-116",
    "title": "YAML front matter (site extension)",
    "category": "Syntax",
    "source": "---\ntitle: Example\ndescription: Replace this text\n---"
  },
  {
    "id": "snippet-117",
    "title": "Obsidian wiki link (extension)",
    "category": "Syntax",
    "source": "[[Project notes]]"
  },
  {
    "id": "snippet-118",
    "title": "Obsidian embed (extension)",
    "category": "Syntax",
    "source": "![[diagram.png]]"
  },
  {
    "id": "snippet-119",
    "title": "MDX component (requires trusted compilation)",
    "category": "Syntax",
    "source": "<Callout>Read the migration guide.</Callout>"
  },
  {
    "id": "snippet-120",
    "title": "GitHub alert (extension)",
    "category": "Syntax",
    "source": "> [!NOTE]\n> Additional context."
  },
  {
    "id": "snippet-121",
    "title": "TIP alert",
    "category": "GitHub",
    "source": "> [!TIP]\n> Use the shortest reproducible example."
  },
  {
    "id": "snippet-122",
    "title": "IMPORTANT alert",
    "category": "GitHub",
    "source": "> [!IMPORTANT]\n> Run the migration before deploying."
  },
  {
    "id": "snippet-123",
    "title": "WARNING alert",
    "category": "GitHub",
    "source": "> [!WARNING]\n> This operation changes persistent data."
  },
  {
    "id": "snippet-124",
    "title": "CAUTION alert",
    "category": "GitHub",
    "source": "> [!CAUTION]\n> Do not publish credentials."
  },
  {
    "id": "snippet-125",
    "title": "Flowchart Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\nflowchart TD\n A[Start] --> B{Ready?}\n B -->|Yes| C[Deploy]\n B -->|No| D[Review]\n```"
  },
  {
    "id": "snippet-126",
    "title": "Sequence Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\nsequenceDiagram\n Client->>API: Request\n API-->>Client: Response\n```"
  },
  {
    "id": "snippet-127",
    "title": "State Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\nstateDiagram-v2\n [*] --> Pending\n Pending --> Complete\n Complete --> [*]\n```"
  },
  {
    "id": "snippet-128",
    "title": "Gantt Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\ngantt\n title Project plan\n dateFormat YYYY-MM-DD\n Draft :a, 2026-01-01, 3d\n Review :after a, 2d\n```"
  },
  {
    "id": "snippet-129",
    "title": "Class Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\nclassDiagram\n class Service {\n +run()\n }\n```"
  },
  {
    "id": "snippet-130",
    "title": "ER Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\nerDiagram\n CUSTOMER ||--o{ ORDER : places\n```"
  },
  {
    "id": "snippet-131",
    "title": "Pie Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\npie title Example allocation\n \"Build\" : 60\n \"Review\" : 40\n```"
  },
  {
    "id": "snippet-132",
    "title": "Journey Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\njourney\n title First contribution\n section Prepare\n  Read docs: 5: Contributor\n  Open PR: 4: Contributor\n```"
  },
  {
    "id": "snippet-133",
    "title": "Git graph Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\ngitGraph\n commit\n branch feature\n checkout feature\n commit\n checkout main\n merge feature\n```"
  },
  {
    "id": "snippet-134",
    "title": "Mind map Mermaid",
    "category": "Diagrams",
    "source": "```mermaid\nmindmap\n root((Markdown))\n  Learn\n  Practice\n  Publish\n```"
  },
  {
    "id": "snippet-135",
    "title": "Frontend profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in frontend and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-136",
    "title": "Frontend project evidence",
    "category": "Profile",
    "source": "### [Frontend project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-137",
    "title": "Backend profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in backend and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-138",
    "title": "Backend project evidence",
    "category": "Profile",
    "source": "### [Backend project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-139",
    "title": "Platform profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in platform and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-140",
    "title": "Platform project evidence",
    "category": "Profile",
    "source": "### [Platform project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-141",
    "title": "Data profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in data and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-142",
    "title": "Data project evidence",
    "category": "Profile",
    "source": "### [Data project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-143",
    "title": "Security profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in security and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-144",
    "title": "Security project evidence",
    "category": "Profile",
    "source": "### [Security project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-145",
    "title": "Design profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in design and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-146",
    "title": "Design project evidence",
    "category": "Profile",
    "source": "### [Design project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-147",
    "title": "QA profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in qa and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-148",
    "title": "QA project evidence",
    "category": "Profile",
    "source": "### [QA project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-149",
    "title": "Documentation profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in documentation and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-150",
    "title": "Documentation project evidence",
    "category": "Profile",
    "source": "### [Documentation project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-151",
    "title": "Product profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in product and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-152",
    "title": "Product project evidence",
    "category": "Profile",
    "source": "### [Product project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-153",
    "title": "Support profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in support and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-154",
    "title": "Support project evidence",
    "category": "Profile",
    "source": "### [Support project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-155",
    "title": "Research profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in research and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-156",
    "title": "Research project evidence",
    "category": "Profile",
    "source": "### [Research project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-157",
    "title": "Mobile profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in mobile and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-158",
    "title": "Mobile project evidence",
    "category": "Profile",
    "source": "### [Mobile project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-159",
    "title": "DevOps profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in devops and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-160",
    "title": "DevOps project evidence",
    "category": "Profile",
    "source": "### [DevOps project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-161",
    "title": "SRE profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in sre and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-162",
    "title": "SRE project evidence",
    "category": "Profile",
    "source": "### [SRE project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-163",
    "title": "Open source profile introduction",
    "category": "Profile",
    "source": "## About me\n\nI work in open source and focus on [problem]. My recent work includes [project and contribution]."
  },
  {
    "id": "snippet-164",
    "title": "Open source project evidence",
    "category": "Profile",
    "source": "### [Open source project]\n\n- Problem: [context]\n- Contribution: [specific work]\n- Outcome: [verified result]\n- [Repository](https://example.com)"
  },
  {
    "id": "snippet-165",
    "title": "React static badge",
    "category": "Badges",
    "source": "![React](https://img.shields.io/badge/React-technology-24584e)"
  },
  {
    "id": "snippet-166",
    "title": "TypeScript static badge",
    "category": "Badges",
    "source": "![TypeScript](https://img.shields.io/badge/TypeScript-technology-24584e)"
  },
  {
    "id": "snippet-167",
    "title": "JavaScript static badge",
    "category": "Badges",
    "source": "![JavaScript](https://img.shields.io/badge/JavaScript-technology-24584e)"
  },
  {
    "id": "snippet-168",
    "title": "Python static badge",
    "category": "Badges",
    "source": "![Python](https://img.shields.io/badge/Python-technology-24584e)"
  },
  {
    "id": "snippet-169",
    "title": "Go static badge",
    "category": "Badges",
    "source": "![Go](https://img.shields.io/badge/Go-technology-24584e)"
  },
  {
    "id": "snippet-170",
    "title": "Rust static badge",
    "category": "Badges",
    "source": "![Rust](https://img.shields.io/badge/Rust-technology-24584e)"
  },
  {
    "id": "snippet-171",
    "title": "Java static badge",
    "category": "Badges",
    "source": "![Java](https://img.shields.io/badge/Java-technology-24584e)"
  },
  {
    "id": "snippet-172",
    "title": "Kotlin static badge",
    "category": "Badges",
    "source": "![Kotlin](https://img.shields.io/badge/Kotlin-technology-24584e)"
  },
  {
    "id": "snippet-173",
    "title": "Docker static badge",
    "category": "Badges",
    "source": "![Docker](https://img.shields.io/badge/Docker-technology-24584e)"
  },
  {
    "id": "snippet-174",
    "title": "Kubernetes static badge",
    "category": "Badges",
    "source": "![Kubernetes](https://img.shields.io/badge/Kubernetes-technology-24584e)"
  },
  {
    "id": "snippet-175",
    "title": "Terraform static badge",
    "category": "Badges",
    "source": "![Terraform](https://img.shields.io/badge/Terraform-technology-24584e)"
  },
  {
    "id": "snippet-176",
    "title": "PostgreSQL static badge",
    "category": "Badges",
    "source": "![PostgreSQL](https://img.shields.io/badge/PostgreSQL-technology-24584e)"
  },
  {
    "id": "snippet-177",
    "title": "Redis static badge",
    "category": "Badges",
    "source": "![Redis](https://img.shields.io/badge/Redis-technology-24584e)"
  },
  {
    "id": "snippet-178",
    "title": "Git static badge",
    "category": "Badges",
    "source": "![Git](https://img.shields.io/badge/Git-technology-24584e)"
  },
  {
    "id": "snippet-179",
    "title": "Linux static badge",
    "category": "Badges",
    "source": "![Linux](https://img.shields.io/badge/Linux-technology-24584e)"
  },
  {
    "id": "snippet-180",
    "title": "Node.js static badge",
    "category": "Badges",
    "source": "![Node.js](https://img.shields.io/badge/Node.js-technology-24584e)"
  },
  {
    "id": "snippet-181",
    "title": "Vue static badge",
    "category": "Badges",
    "source": "![Vue](https://img.shields.io/badge/Vue-technology-24584e)"
  },
  {
    "id": "snippet-182",
    "title": "Svelte static badge",
    "category": "Badges",
    "source": "![Svelte](https://img.shields.io/badge/Svelte-technology-24584e)"
  },
  {
    "id": "snippet-183",
    "title": "Angular static badge",
    "category": "Badges",
    "source": "![Angular](https://img.shields.io/badge/Angular-technology-24584e)"
  },
  {
    "id": "snippet-184",
    "title": "Next.js static badge",
    "category": "Badges",
    "source": "![Next.js](https://img.shields.io/badge/Next.js-technology-24584e)"
  },
  {
    "id": "snippet-185",
    "title": "FastAPI static badge",
    "category": "Badges",
    "source": "![FastAPI](https://img.shields.io/badge/FastAPI-technology-24584e)"
  },
  {
    "id": "snippet-186",
    "title": "Django static badge",
    "category": "Badges",
    "source": "![Django](https://img.shields.io/badge/Django-technology-24584e)"
  },
  {
    "id": "snippet-187",
    "title": "Spring static badge",
    "category": "Badges",
    "source": "![Spring](https://img.shields.io/badge/Spring-technology-24584e)"
  },
  {
    "id": "snippet-188",
    "title": "Prometheus static badge",
    "category": "Badges",
    "source": "![Prometheus](https://img.shields.io/badge/Prometheus-technology-24584e)"
  },
  {
    "id": "snippet-189",
    "title": "Grafana static badge",
    "category": "Badges",
    "source": "![Grafana](https://img.shields.io/badge/Grafana-technology-24584e)"
  },
  {
    "id": "snippet-190",
    "title": "AWS static badge",
    "category": "Badges",
    "source": "![AWS](https://img.shields.io/badge/AWS-technology-24584e)"
  },
  {
    "id": "snippet-191",
    "title": "GCP static badge",
    "category": "Badges",
    "source": "![GCP](https://img.shields.io/badge/GCP-technology-24584e)"
  },
  {
    "id": "snippet-192",
    "title": "Azure static badge",
    "category": "Badges",
    "source": "![Azure](https://img.shields.io/badge/Azure-technology-24584e)"
  },
  {
    "id": "snippet-193",
    "title": "HTML static badge",
    "category": "Badges",
    "source": "![HTML](https://img.shields.io/badge/HTML-technology-24584e)"
  },
  {
    "id": "snippet-194",
    "title": "CSS static badge",
    "category": "Badges",
    "source": "![CSS](https://img.shields.io/badge/CSS-technology-24584e)"
  },
  {
    "id": "snippet-195",
    "title": "SQL static badge",
    "category": "Badges",
    "source": "![SQL](https://img.shields.io/badge/SQL-technology-24584e)"
  },
  {
    "id": "snippet-196",
    "title": "C++ static badge",
    "category": "Badges",
    "source": "![C++](https://img.shields.io/badge/C%2B%2B-technology-24584e)"
  },
  {
    "id": "snippet-197",
    "title": "C# static badge",
    "category": "Badges",
    "source": "![C#](https://img.shields.io/badge/C%23-technology-24584e)"
  },
  {
    "id": "snippet-198",
    "title": "Ruby static badge",
    "category": "Badges",
    "source": "![Ruby](https://img.shields.io/badge/Ruby-technology-24584e)"
  },
  {
    "id": "snippet-199",
    "title": "PHP static badge",
    "category": "Badges",
    "source": "![PHP](https://img.shields.io/badge/PHP-technology-24584e)"
  },
  {
    "id": "snippet-200",
    "title": "Swift static badge",
    "category": "Badges",
    "source": "![Swift](https://img.shields.io/badge/Swift-technology-24584e)"
  },
  {
    "id": "snippet-201",
    "title": "Security policy",
    "category": "Engineering",
    "source": "## Reporting a vulnerability\n\nReport privately through [security contact]. Do not include exploit details in public issues."
  },
  {
    "id": "snippet-202",
    "title": "Contribution guide",
    "category": "Engineering",
    "source": "## Contributing\n\n1. Read the issue and agree on scope.\n2. Create a branch and make a focused change.\n3. Run the checks and open a pull request."
  },
  {
    "id": "snippet-203",
    "title": "License notice",
    "category": "Engineering",
    "source": "## License\n\n[License name]. See [LICENSE](./LICENSE) for terms."
  },
  {
    "id": "snippet-204",
    "title": "Support boundaries",
    "category": "Engineering",
    "source": "## Support\n\nSupported versions: [versions]. For help, include a minimal reproduction and redact secrets."
  },
  {
    "id": "snippet-205",
    "title": "Deprecation notice",
    "category": "Engineering",
    "source": "## Deprecation\n\n[Feature] is deprecated as of [version]. Migrate to [replacement] before [date]."
  },
  {
    "id": "snippet-206",
    "title": "API pagination",
    "category": "Engineering",
    "source": "## Pagination\n\nPass the returned cursor to fetch the next page. Stop when `next_cursor` is null."
  },
  {
    "id": "snippet-207",
    "title": "Retry guidance",
    "category": "Engineering",
    "source": "## Retries\n\nRetry transient failures with bounded exponential backoff and jitter. Honor `Retry-After`."
  },
  {
    "id": "snippet-208",
    "title": "Idempotency",
    "category": "Engineering",
    "source": "## Idempotency\n\nReuse the same idempotency key for retries of the same operation."
  },
  {
    "id": "snippet-209",
    "title": "Environment variables",
    "category": "Engineering",
    "source": "| Variable | Required | Example |\n| --- | --- | --- |\n| PORT | No | 8080 |\n| API_TOKEN | Yes | Set securely |"
  },
  {
    "id": "snippet-210",
    "title": "Migration verification",
    "category": "Engineering",
    "source": "## Verification\n\n- [ ] Compare row counts.\n- [ ] Verify representative reads.\n- [ ] Check error rates.\n- [ ] Confirm rollback remains available."
  }
]
export const resources = [...templates, ...snippets]
