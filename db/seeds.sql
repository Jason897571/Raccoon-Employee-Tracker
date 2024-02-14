-- department table
INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Engineering'),
(4, 'Human Resources'),
(5, 'Finance');

-- role table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales Manager', 80000.00, 1),
(2, 'Sales Representative', 50000.00, 1),
(3, 'Marketing Manager', 75000.00, 2),
(4, 'Marketing Specialist', 60000.00, 2),
(5, 'Software Engineer', 90000.00, 3),
(6, 'QA Engineer', 80000.00, 3),
(7, 'HR Manager', 70000.00, 4),
(8, 'Recruiter', 55000.00, 4),
(9, 'Finance Director', 100000.00, 5),
(10, 'Accountant', 65000.00, 5);

-- employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, 1),
(3, 'Michael', 'Johnson', 2, 1),
(4, 'Emily', 'Williams', 3, NULL),
(5, 'David', 'Brown', 4, 3),
(6, 'Jessica', 'Davis', 4, 3),
(7, 'Robert', 'Miller', 5, NULL),
(8, 'Karen', 'Wilson', 6, 7),
(9, 'Christopher', 'Taylor', 6, 7),
(10, 'Mary', 'Moore', 7, NULL),
(11, 'Daniel', 'Anderson', 8, 10),
(12, 'Lisa', 'Thomas', 8, 10),
(13, 'Steven', 'Jackson', 9, NULL),
(14, 'Patricia', 'White', 10, 13),
(15, 'Richard', 'Harris', 10, 13),
(16, 'Elizabeth', 'Martin', 5, NULL),
(17, 'Charles', 'Thompson', 6, 16),
(18, 'Amanda', 'Garcia', 6, 16),
(19, 'Kevin', 'Martinez', 7, NULL),
(20, 'Laura', 'Robinson', 8, 19),
(21, 'Mark', 'Clark', 8, 19),
(22, 'Ashley', 'Lewis', 9, NULL),
(23, 'Justin', 'Lee', 10, 22),
(24, 'Samantha', 'Walker', 10, 22),
(25, 'Brandon', 'Young', 5, NULL),
(26, 'Megan', 'Hall', 6, 25),
(27, 'Ryan', 'Allen', 6, 25),
(28, 'Kimberly', 'King', 7, NULL),
(29, 'John', 'Scott', 8, 28),
(30, 'Michelle', 'Green', 8, 28),
(31, 'Joshua', 'Baker', 9, NULL),
(32, 'Melissa', 'Adams', 10, 31),
(33, 'Andrew', 'Nelson', 10, 31),
(34, 'Stephanie', 'Hill', 5, NULL),
(35, 'Timothy', 'Wright', 6, 34),
(36, 'Heather', 'Lopez', 6, 34),
(37, 'Jason', 'King', 7, NULL),
(38, 'Nicole', 'Scott', 8, 37),
(39, 'Matthew', 'Green', 8, 37),
(40, 'Rebecca', 'Evans', 9, NULL),
(41, 'Jeremy', 'Morris', 10, 40),
(42, 'Christina', 'Kelly', 10, 40),
(43, 'Gregory', 'Rivera', 5, NULL),
(44, 'Amy', 'Perez', 6, 43),
(45, 'Tiffany', 'Roberts', 6, 43),
(46, 'Benjamin', 'Turner', 7, NULL),
(47, 'Brenda', 'Phillips', 8, 46),
(48, 'Kyle', 'Campbell', 8, 46),
(49, 'Victoria', 'Parker', 9, NULL),
(50, 'Jeremy', 'Morales', 10, 49);