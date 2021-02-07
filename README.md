# Project Workspace

This project was set up as a Dirtwork workspace. This is a `pnpm` workspace, and you must use `pnpm` to manage
all packages you add both at the root level and all of the dependencies you add

The intent is for this workspace to hold all development tooling that is common across more than one package.
This ensure they are all configured the same and use the same versions of tools, avoiding inconsistencies that
can be a nightmare to resolve.

## Install

## Usage

### Adding a new package

Packages (by default) are intended to be published to NPN and re-used. You can also choose to make
them private and only use them within the monorepo. 

```
pnpm init dirtwork package [name]
```

or

```
pnpx create-dirtwork package [name]
```

### Creating a new package

Apps are Next JS applications, preconfigured to use Material UI as a component library. 

```
pnpm init dirtwork app [name]
```

or

```
pnpx create-dirtwork app [name]
```

### Adding a new dependency
Generally, if you are adding new development tooling to your package (say, to extend ESLint rules),
you should add the dependency as a development dependency within the workspace. This will make
the dependency available to all packages and applications, instead of adding it to each one
individually. In order to manually add a dependency, run the following from the workspace's root
directory

```bash
pnpm add -WD <packagename>
```

If you try to install a dependency from the root without the `-W` flag, you will get the following error:

```
ERROR  Running this command will add the dependency to the workspace root, which might not be what you want - 
if you really meant it, make it explicit by running this command again with the -W flag 
(or --ignore-workspace-root-check).
```

## Contributing

PRs accepted.

## License

ISC © Ryan Festag
