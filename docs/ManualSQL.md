###
SELECT * FROM todos;
###
INSERT INTO todos (title, description) VALUES ('Do ToDo', 'Learn javascript and SQL');
###
UPDATE todos SET completed=true WHERE id=7;
###


###
SELECT title, description, id FROM todos WHERE id>3;
###
   title   |              description               | id 
-----------+----------------------------------------+----
 Exercise  | Go for a 30-minute run                 |  4
 Read book | Finish chapter 5 of "The Great Gatsby" |  5
 Buy beer  | Sandels, San Miguel                    |  6
 Do ToDo   | Learn JavaScript and SQL               |  7


###
SELECT * FROM todos WHERE title LIKE '%beer%';
###
 id |  title   |     description     | completed |         created_at         
----+----------+---------------------+-----------+----------------------------
  6 | Buy beer | Sandels, San Miguel | f         | 2024-10-08 10:05:49.113582


###
SELECT * FROM todos WHERE description LIKE '%S_n%';
###
 id |  title   |     description     | completed |         created_at         
----+----------+---------------------+-----------+----------------------------
  6 | Buy beer | Sandels, San Miguel | f         | 2024-10-08 10:05:49.113582

###
DELETE FROM todos WHERE description LIKE '%javascript%';
### NOT SUCCESS! CASE SENSITIVE
DELETE 0


###
DELETE FROM todos WHERE description LIKE '%JavaScript%';
### SUCCESS
DELETE 1

###
SELECT * FROM todos JOIN todo_tags ON todos.id = todo_tags.todo_id;
### ONLY IF YOU HAVE INFO IN TWO TABLES. We don't see id 6 because we don't have a tag there.
 id |     title      |              description               | completed |         created_at         | todo_id | tag_id 
----+----------------+----------------------------------------+-----------+----------------------------+---------+--------
  1 | Buy groceries  | Milk, eggs, bread                      | f         | 2024-10-08 08:36:39.708708 |       1 |      1
  1 | Buy groceries  | Milk, eggs, bread                      | f         | 2024-10-08 08:36:39.708708 |       1 |      4
  2 | Finish project | Complete the report by Friday          | f         | 2024-10-08 08:36:39.708708 |       2 |      2
  2 | Finish project | Complete the report by Friday          | f         | 2024-10-08 08:36:39.708708 |       2 |      4
  3 | Call mom       | Catch up and plan visit                | t         | 2024-10-08 08:36:39.708708 |       3 |      1
  4 | Exercise       | Go for a 30-minute run                 | f         | 2024-10-08 08:36:39.708708 |       4 |      3
  5 | Read book      | Finish chapter 5 of "The Great Gatsby" | f         | 2024-10-08 08:36:39.708708 |       5 |      1
  5 | Read book      | Finish chapter 5 of "The Great Gatsby" | f         | 2024-10-08 08:36:39.708708 |       5 |      5
(8 rows)

###
SELECT * FROM todos LEFT JOIN todo_tags ON todos.id = todo_tags.todo_id;
### We have id 6 here. Because it's left join.
 id |     title      |              description               | completed |         created_at         | todo_id | tag_id 
----+----------------+----------------------------------------+-----------+----------------------------+---------+--------
  1 | Buy groceries  | Milk, eggs, bread                      | f         | 2024-10-08 08:36:39.708708 |       1 |      1
  1 | Buy groceries  | Milk, eggs, bread                      | f         | 2024-10-08 08:36:39.708708 |       1 |      4
  2 | Finish project | Complete the report by Friday          | f         | 2024-10-08 08:36:39.708708 |       2 |      2
  2 | Finish project | Complete the report by Friday          | f         | 2024-10-08 08:36:39.708708 |       2 |      4
  3 | Call mom       | Catch up and plan visit                | t         | 2024-10-08 08:36:39.708708 |       3 |      1
  4 | Exercise       | Go for a 30-minute run                 | f         | 2024-10-08 08:36:39.708708 |       4 |      3
  5 | Read book      | Finish chapter 5 of "The Great Gatsby" | f         | 2024-10-08 08:36:39.708708 |       5 |      1
  5 | Read book      | Finish chapter 5 of "The Great Gatsby" | f         | 2024-10-08 08:36:39.708708 |       5 |      5
  6 | Buy beer       | Sandels, San Miguel                    | f         | 2024-10-08 10:05:49.113582 |         |       
(9 rows)