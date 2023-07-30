# Torb
 Tor for Urbit

For now, this app queries Onionoo protocol to get information about Tor relays and bridges.



### To build from source

Create and mount a new desk on your ship (or development ship) by runnig these commands in Dojo:


`|new-desk %torb`


`|mount %torb`


`cd` to your ship's directory and delete all the files in torb folder:


`sudo rm -r torb/*`

Copy the content of Urbit directory from the this repo into torb folder you just emptied.

In dojo:

`|commit %torb`

`|install our %torb`



