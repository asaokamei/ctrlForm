formUpDown
==========

a JavaScript to navigate through html form using ctrol+arrow keys.

In side a table style form (as often found in phpMyAdmin), this 
script lets you navigate element to element freely inside the 
table like an Excel; goint left/right and up/down. Well, at least 
it should since I have not tested yet with any other forms. 

requires jQuery and its plugin, hotkeys. 

To-Dos
------

still buggy. 
don't know what is causing this yet. 

in Mac OSX, ctrl+arrow keys are used by Mission Control. 
should bind to command+arrow keys. 

should provide as jQuery's plugin module. Yep, it uses *global* variables.

Table Structure
---------------

This scripts judges if an element is inside a table by checking 
if the name contains '[' charactor. 

if an element inside a table is focused, it tries to find an 
element with the same table name (name without [). 

So, this script works only with certain structure of table...