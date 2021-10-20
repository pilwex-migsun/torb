:: what we create here is torb-action type
:: import types from sur
/-  *torb
:: import from lib
/+  *torb
:: create a door with arms that handle type transformation.
:: sample is the relevant type from sur (here action)
|_  =action
:: grab transforms from other types to our type
++  grab
  |%
  ++  noun  action
  ++  json
    |=  jsn=^json
    (json-to-action jsn)
  --
++  grow
  |%
  ++  noun  action
  --
++  grad  %noun
--
