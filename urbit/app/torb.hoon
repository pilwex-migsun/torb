/-  *torb
/+  *server, default-agent, *torb
::
=>  |%
    +$  state-0  [%0 ~]
    ::
    +$  card  card:agent:gall
    +$  gift  gift:agent:gall
    --
::
=|  state-0
=*  state  -
^-  agent:gall
=<  |_  =bowl:gall
  :: aliases
  +*  this       .
      torb-core  +>
      tc         ~(. torb-core bowl)
      def        ~(. (default-agent this %|) bowl)
  ::
  ++  on-init  on-init:def
  ++  on-watch
    |=  =path
    ^-  (quip card _this)
    ?:  ?=([%http-response *] path)
      `this
    ?.  =(/all path)
      (on-watch:def path)
    [[%give %fact ~ %json !>(*json)]~ this]
  ::
  ++  on-agent  on-agent:def
  ::
  ++  on-arvo
    |=  [=wire =sign-arvo]
    ^-  (quip card _this)
    ?:  =(-.wire %query-onionoo)
      :: sign-arvo is [%iris %http-response %finished * *]
      =/   gft  (handle-onionoo-response (client-response:iris +>.sign-arvo) +<.wire)
      [[%give gft]~ this]
    ?.  ?=(%bound +<.sign-arvo)
      (on-arvo:def wire sign-arvo)
    [~ this]
  ::
  ::
  ++  on-poke
    |=  [=mark =vase]
    ^-  (quip card _this)
    :: make sure it either us or our moons poking
    ?>  (team:title our.bowl src.bowl)
    ?+  mark  `this
      %torb-action
    [[(handle-action:tc !<(action vase))]~ this]
    ::
      %noun
    :: check if we have got [mark=%noun vase=[#t/%subs q=1.935.832.435]]
    ?:  ?=([%noun * %subs] +<)
      ~&  &2.bowl  `this
    `this
    ==
  ::
  ++  on-save  on-save:def
  ++  on-load
    |=  =vase
    ^-  (quip card _this)
    `this
  ++  on-leave  on-leave:def
  ++  on-peek   on-peek:def
  ++  on-fail   on-fail:def
  --
::
:: helper door
::
|_  =bowl:gall
::
++  handle-action
  |=  =action
  ^-  card
  ?-  -.action
      %query-onionoo  (handle-onionoo-query +.action)
  ==
::
++  handle-onionoo-query
  |=  url=tape
  ~&  'onionoo query is sent. URL is'
  ~&  url
  ^-  card
  =/  =request:http
    [%'GET' (crip (weld "https://onionoo.torproject.org/" url)) ~ ~]
  :*
    %pass
    /query-onionoo/(crip url)/(scot %p src.bowl)/(scot %ux (cut 2 [0 10] eny.bowl))
    %arvo  %i
    %request  request  *outbound-config:iris
  ==
::
++  handle-onionoo-response
  |=  [response=client-response:iris url=cord]
  ^-  gift
  :: response=[%finished =response-header:http  full-file=(unit mime-data:iris)]
  :: full-file=[~ u=[type=@t data=[p=@ q=@]]]
  ::
  :: make sure the response is finished
  ?.  ?=([%finished *] response)
    (gift)
  =/  full-file=(unit mime-data:iris)  full-file.response
  =/  =response-header:http  response-header.response
  :: handle status codes here: 200 is ok 400 is bad request 
  :: 500 is Internal Server Error 503 is Service Unavailable
  ::
  ?~  full-file
    (gift)
  :: result of de-json:html is [~ u=[%o p=json]]
  =/  data=(unit json)  (de-json:html q.data.u.full-file)
  ?~  data
    (gift)
  ~&  'Torb got Onionoo response'
  :: adding url as an identifier before sending data to landscape
  =/  jsn=json  (pairs:enjs:format ~[['url' [%s url]] ['response' u.data]])
  :: create a gift to %give to landscape
  [%fact ~[/all] %json !>(jsn)]
--
