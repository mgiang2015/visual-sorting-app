# Visual Sorting App
This is a web application that visualises 5 popular sorting techniques: Bubble Sort, Insertion Sort, Selection Sort, Merge Sort and Quick Sort. This is a project for me to learn development with ReactJS and NextJS framework.

## Website

This app is deployed on Vercel. Head over to [Visual Sorting App](https://visual-sorting-app.vercel.app) to test the app out!

## Existing Features
- Automaticly generates input array (for now, it's n distinct numbers from 1 to n).
- Visually highlight which portion is sorted, which is being checked and which portion is still being processed.
- Shows performance measures that one usually look for in a soring algorithm: time taken and number of writes. Time taken includes the animation in ReactJS, which results in a much larger timing than if you were to run it on your computer.
- Allow more than 1 algorithm to run simultaneously, so that you can compare between algorithms.

## Still in development
- Custom input
- Randomly generated input within a range (max, min)
- Better UI experience

## NextJS Documentation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, clone this repository and run `npm install` to install all dependencies.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
