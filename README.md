# In the fast lane

Checkout the samples in `outputs-examples`. There are images showing what the end result looks like & samples of the templated files.

Do it yourself:

```
docker build . -t devyo
docker run -v /PATH/TO/THIS/GIT/REPO/ON/YOUR/LOCAL:/devyo -it devyo sh

cd generator-app && npm link && cd -
mkdir outputs && cd outputs
yo app

# ... you can do the same for any generator
```

App: [demo ready] Creates an application that can be deployed (eg hello world java application that responds on http)
Container: [Not implmeneted yet] Creates a standalone container image that can be pushed to an artifact store (e.g for a runtime link python or go that can be consumed by something else)
Vlidation check: [demo] Creates a new validation check folder that confirms to the standard outlined in the validation framework (not shown here but bascially make and docker)

# Create dev yeoman container

```
docker build . -t devyo
```

# Run dev yeoman container - and create a generator

```
docker run -v /Users/drew/code/yo/:/devyo -it devyo sh
```

## Creating your own generator

```
/devyo $ yo generator
```

## Working with an existing generator

Make locally accessable:
```
/devyo $ cd generator-devyo
/devyo $ npm link
```

Create new project from a generator:
```
/devyo $ mkdir new-folder && cd new-folder
/devyo $ go generator-devyo
```
