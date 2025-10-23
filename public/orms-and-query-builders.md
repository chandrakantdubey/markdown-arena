# ORMs and Query Builders

## Introduction

When working with relational (SQL) databases, backend applications need a way to execute queries. While you can write raw SQL strings, this is often tedious, error-prone, and insecure. ORMs (Object-Relational Mappers) and Query Builders are libraries that provide a higher-level abstraction for database interactions.

-   **ORM**: Maps database tables to application-level objects/classes. You interact with objects, and the ORM translates that into SQL.
-   **Query Builder**: Provides a programmatic, fluent API to construct SQL queries. It's a thinner abstraction than an ORM.

## ORM Examples

With an ORM, you define models that represent your tables, and the library handles the SQL generation.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (Sequelize)</button>
    <button class="tab-button" data-lang="python">Python (SQLAlchemy)</button>
    <button class="tab-button" data-lang="go">Go (GORM)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

// 1. Define a model
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, allowNull: false },
});

async function main() {
  await sequelize.sync(); // Creates the table
  
  // 2. Create an instance (INSERT)
  const alice = await User.create({ name: 'Alice', email: 'alice@example.com' });
  
  // 3. Find an instance (SELECT)
  const user = await User.findOne({ where: { email: 'alice@example.com' } });
  
  // 4. Update an instance (UPDATE)
  user.name = 'Alice Smith';
  await user.save();
  
  // 5. Delete an instance (DELETE)
  await user.destroy();
}
main();
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()
engine = create_engine('sqlite:///:memory:')

# 1. Define a model
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, nullable=False)

Base.metadata.create_all(engine) # Creates the table
Session = sessionmaker(bind=engine)
session = Session()

# 2. Create an instance (INSERT)
alice = User(name='Alice', email='alice@example.com')
session.add(alice)
session.commit()

# 3. Find an instance (SELECT)
user = session.query(User).filter_by(email='alice@example.com').first()

# 4. Update an instance (UPDATE)
user.name = 'Alice Smith'
session.commit()

# 5. Delete an instance (DELETE)
session.delete(user)
session.commit()
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main
import (
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)

// 1. Define a model
type User struct {
	gorm.Model
	Name  string
	Email string `gorm:"uniqueIndex"`
}

func main() {
	db, _ := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	db.AutoMigrate(&User{}) // Creates the table

	// 2. Create an instance (INSERT)
	alice := User{Name: "Alice", Email: "alice@example.com"}
	db.Create(&alice)

	// 3. Find an instance (SELECT)
	var user User
	db.First(&user, "email = ?", "alice@example.com")

	// 4. Update an instance (UPDATE)
	db.Model(&user).Update("Name", "Alice Smith")

	// 5. Delete an instance (DELETE)
	db.Delete(&user, user.ID)
}
</code></pre>
  </div>
</div>

## Query Builder Examples

A Query Builder gives you more direct control over the SQL, without the object mapping layer.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (Knex.js)</button>
    <button class="tab-button" data-lang="python">Python (SQLAlchemy Core)</button>
    <button class="tab-button" data-lang="go">Go (Squirrel)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const knex = require('knex')({ client: 'sqlite3', connection: { filename: ':memory:' } });

async function main() {
    // Builds: SELECT "id", "name" FROM "users" WHERE "email" = ?
    const users = await knex('users')
      .select('id', 'name')
      .where({ email: 'alice@example.com' })
      .limit(10);
      
    // The result 'users' is an array of plain objects: [{ id: 1, name: 'Alice' }]
}
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
from sqlalchemy import table, column, select

users = table("users",
    column("id"),
    column("name"),
    column("email"),
)

# Builds: SELECT users.id, users.name FROM users WHERE users.email = :email_1
stmt = select(users.c.id, users.c.name).where(users.c.email == 'alice@example.com')

# You would then execute this statement with a database connection
# result = connection.execute(stmt)
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main
import (
    "fmt"
    "github.com/Masterminds/squirrel"
)

func main() {
    // Builds: SELECT id, name FROM users WHERE email = ?
    sql, args, err := squirrel.Select("id", "name").
        From("users").
        Where(squirrel.Eq{"email": "alice@example.com"}).
        PlaceholderFormat(squirrel.Question).
        ToSql()

    if err != nil {
        panic(err)
    }

    fmt.Println(sql)  // SELECT id, name FROM users WHERE email = ?
    fmt.Println(args) // [alice@example.com]
}
</code></pre>
  </div>
</div>

## SQL Injection Prevention
Both ORMs and Query Builders are crucial for preventing SQL injection. They achieve this by using **parameterized queries**, where the SQL command is sent to the database separately from the user-provided data. The database engine then combines them safely, treating the user data as literal values, not as executable code.