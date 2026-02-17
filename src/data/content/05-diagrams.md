---
id: diagrams
title: Diagrams & Visuals
level: Intermediate
---

# Diagrams & Visuals

While not native Markdown, many platforms support diagram syntax via libraries like Mermaid.js.

## Mermaid Code Blocks
Mark a code block with `mermaid`.

### Flowchart
```mermaid
graph TD;
    A[Start] --> B{Loop?};
    B -- Yes --> B;
    B -- No --> C[End];
```

### Sequence Diagram
```mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob
    Bob-->>Alice: Hi Alice
```

### Class Diagram
```mermaid
classDiagram
    Animal <|-- Duck
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
```

### Gantt Chart
```mermaid
gantt
    title A Gantt Diagram
    section Section
    A task :a1, 2014-01-01, 30d
```

### Pie Chart
```mermaid
pie title Pets
    "Dogs" : 386
    "Cats" : 85
```

## ASCII Art
The "old school" way. Just use a standard code block.

```text
+---------+
|   Box   |
+---------+
```
