# Melina Language (.mlina extension) inspired in Melina from Elden Ring

### Data types and statement structs in melina language

- keyword to begin the program file scope (entrypoint).

```
begin_melina
```

- keyword to end the program file scope.

```
end_melina
```

- if keyword to do comparasions and return values.

```
if keyword opened parenthesis comparasion / operation closed parenthesis opened curly brackets

...statement

close curly bracket (end)

ex: if (1+1 == 2) {
  return true
}

```

function keyword to encapsule statements and codes to improve the way to code in language.

```
function keyword namespace opened parenthesis param colon to datatype data type closed parenthesis doublecolon (::) returned data type

...statement

closed parenthesis

ex: fn greeting(name: string) ::string {
  return "Hello @@name!"
}
```
