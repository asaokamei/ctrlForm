ctrlUDForm
==========

a jQuery plug-in to navigate html form using ctrl+arrow keys.

for Mac, meta+arrow keys works. 

Inside a table style form (as often found in phpMyAdmin), this 
script lets you navigate element to element freely inside the 
table like an Excel; goint left/right and up/down. Well, at least 
it should since I have not tested yet with any other forms. 

requires jQuery and its plugin, hotkeys. 

How to Use ctrlUDForm
---------------------

include jQuery, hotkeys, and ctrlUDForm, and initiate ctrlUDForm 
specifying which form to control. 

    <script type="text/javascript" src="./vendor/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="./vendor/jquery.hotkeys.js"></script>
    <SCRIPT type="text/javascript" src="./ctrlUDForm.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
      $('form').ctrlUDForm();
    });
    </script>

Options are:

* `$('form').ctrlUDForm( {focus:3} );` 

    focus on 3rd elemnt in the form. default is 0.

* `$('form').ctrlUDForm( {control:'ctrl'} );` 

    use ctrl key only to control the form. 
    default is ['ctrl','meta'].


Table Structure
---------------

This scripts judges if an element is inside a table by checking 
if the name contains '[' charactor. example: `email[3]`. The 
body of the name (without [) is considered as its name of the element. 

if a focused element has [ charctor in its name, ctrlUDForm tries to 
find a next element with name having the same name, i.e. `email[4]`.

As you can see, ctrlUDForm does not check the value of index nor table 
structure, and therefore it may not work well for certain case...
