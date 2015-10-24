# API Specification

Our API is specified using RAML. To view documentation for our API, first install raml2html.

```
sudo npm i -g raml2html
```

In this folder, generate the html documentation:

```
raml2html api.raml > api.html
```

Use your favorite browser to open the HTML file. For example:

```
firefox api.html
```


## Troubleshooting

If raml2html produces no output on Ubuntu the problem may be that the node
command does not work.  To confirm this, run `node`. If you get a prompt for
node, then you are fine. If the command does nothing, then you most likely have
the wrong program installed. Complete the following steps to solve this issue:

```
sudo apt-get remove node
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

See http://askubuntu.com/a/521018 for more details on this problem.
