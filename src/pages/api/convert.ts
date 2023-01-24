// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import the module
const recipeScraper = require("@jrmuys/recipe-scraper");

type Data = {
   name: string
   ingredients: string[]
   instructions: string[]
   tags: string[]
   servings: string
   image: string
   time: {
      prep: string
      cook: string
      active: string
      inactive: string
      ready: string
      total: string
   }
}

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data[]>
) {
   const { url } = req.body;
   // using Promise chaining
   console.log(url)
   recipeScraper(url).then((recipe: Data[]) => {
      // do something with recipe
      console.log(recipe)
      res.status(200).json(recipe)
   }).catch((error: any) => {
      console.error(error)
      res.status(500).json(error)
      // do something with error
   });
}