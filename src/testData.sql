\c team4c;

-- insert test questions
INSERT INTO question (text, title, user_id)
    VALUES
    ('Hi guys! I was wondering if anyone could help me find the difference between logical AND gates and logical OR gates? I have tried looking around with no success!', 'What is the difference between AND gate and OR gate?', 1),
    ('Hello everyone, I have been struggling to manage my time effectively for my coursework and I was wondering if anyone had any suggestions for me? Any help would be much appreciated!','How do you manage your time effectively?', 1),
    ('test input','How does time differ near black holes?', 1),
    ('test input','What can I expect from my second year?', 1),
    ('test input','What is the best way to divide two large numbers?', 1),
    ('test input','I am looking for help with programming!', 1),
    ('test input','What is the stock market?', 1),
    ('test input','How will my grades be calculated?', 1),
    ('test input','How soon should I start my coursework?', 1),
    ('test input','Simple Addition', 1),
    ('test input','History Exams!', 1),
    ('test input','Where do I go when I need to speak to someone about my health?', 1),
    ('test input','Final year project ideas?', 1),
    ('test input','Best maths materials?', 1);

INSERT INTO answer (text, user_id, question_id, score)
    VALUES
    ('Hello, I think you will find that the difference between the two is very simple, AND gates are only true when both inputs are true, OR gates are true when if 1 or more inputs are true! I hope this helps.', 1, 2, 5),
    ('I think you can find some useful resources online if you look around!', 1, 2, 1),
    ('If you have any further questions I would be happy to help, but from what I can see, the answers above are very good!', 1, 2, 0),
    ('Hello, I have struggled with time management in the past and I have found that the best thing to do is to get started early! Try to get things done in small bits over a long period of time so that you are not burnt out!', 1, 3, 2),
    ('I find it best to write down some plans so that I am less stressed.', 1, 3, 2),
    ('There are some nice articles online which have very good explanations for this stuff!',1, 3, 1);




