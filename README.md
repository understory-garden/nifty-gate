# Single Page Gate

This is the default single page Understory Garden Gate. It's a
simple [Next.js](https://next.js.org/) application designed be used as
a showcase for an [Understory Garden](https://understory.garden) note.

Read our [Grant for the Web Final Report](https://community.webmonetization.org/understory/understory-final-grant-report-4ld5) to see how you can deploy and customize
this Gate on Understory Garden today.

## Deploy your own

Because this is just a Next.js application, you can run it locally or deploy
it to any hosting service you like. It is designed to be deployed
with [Incremental Static Regeneration](https://vercel.com/docs/next.js/incremental-static-regeneration) enabled
so it may not function quite the way you expect if your hosting provider doesn't
support that feature.

### Setup

To get started, run `npm install` in the root directory of this project.

Next, create a `.env.local` file in the root directory of this project and use it
to set `GNOME_CONFIG_URL`. For example, in my development repository I have a `.env.local` file
with the following contents:

```bash
GNOME_CONFIG_URL=https://understory.myunderstory.com/public/apps/understory/garden/gnomes.ttl#162088323608334856805631776244
```

### Local development

To work on this project locally, from the root directory of this project run:

```bash
npm run dev
```

### Custom Deployment on Vercel

To deploy this project on [Vercel](https://vercel.com/), fork this repository on GitHub or
clone and push to any Git hosting platform supported by Vercel. Follow the
[instructions in the Next.js documentation](https://nextjs.org/docs/deployment) to deploy.

You will need to set the `GNOME_CONFIG_URL` environment variable when deploying this project. For
more information on how to set environment variables on deployments, see the documentation provided
by your hosting provider. Instructions for Vercel [can be found here](https://vercel.com/docs/environment-variables).




```
npm run dev
```

