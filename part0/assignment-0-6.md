```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Nothing new is fetched, the web is re rendered with the new note
    Note left of server: Server updates notes array with new note object, but server database is not updated
    deactivate server
    

```
