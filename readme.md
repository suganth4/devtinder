MODEL      → defines shape of data, indexes, schema-level validation
             (what a user looks like, what fields are required)

SERVICE    → business logic + database queries
             (how to create a user, how to verify a password, what rules apply)

CONTROLLER → HTTP layer only
             (receive request, call service, send response)
