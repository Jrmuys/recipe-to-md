import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import Link from 'next/link';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
   const [website, setWebsite] = useState('');
   const [markdown, setMarkdown] = useState('');

   const handleSubmit = async (e: Event) => {
      e.preventDefault();
      console.log(website);
      if (!website) return;
      if (website === 'template') {
         setMarkdown(
            convertRecipeToMd({
               name: 'Recipe Name',
               image: 'https://example.com/image.jpg',
               description: 'Recipe description',
               ingredients: ['1 cup of flour', '1 cup of sugar'],
               instructions: ['Mix ingredients', 'Bake at 350 degrees'],
               tags: ['tag1', 'tag2'],
               time: {
                  prep: '10 minutes',
                  cook: '20 minutes',
                  inactive: '5 minutes',
                  ready: '35 minutes',
                  total: '1 hour',
               },
               servings: '4',
            })
         );
         return;
      }

      const requestData = {
         url: website,
      };
      const response = fetch('http://localhost:3000/api/convert', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(requestData),
      });
      response
         .then((res) => res.json())
         .then((data) => setMarkdown(convertRecipeToMd(data)))
         .catch((err) => console.log(err));
   };

   const handleCopy = () => {
      console.log('copy');
      navigator.clipboard.writeText(markdown);
   };

   const handleChange = (e) => {
      setWebsite(e.target.value);
   };

   const convertRecipeToMd = (recipe) => {
      const {
         name,
         image,
         description,
         ingredients,
         instructions,
         tags,
         time,
         servings,
      } = recipe;
      const markdown = `---
title: ${name}
description: ${description}
category: recipe
tags: [${tags.map((tag) => `${tag}`).join(', ')}]
---
# ${name}

![${name}](${image})

${description}

${time.prep ? `Prep: ${time.prep}\n` : ''}${
         time.cook ? `Cook: ${time.cook}\n` : ''
      }${time.inactive ? `Inactive: ${time.inactive}\n` : ''}${
         time.ready ? `Yield: ${time.yield}\n` : ''
      }${time.total ? `Total: ${time.total}` : ''}
${servings ? `\nServings: ${servings}\n` : ''}
Original recipe: [${name}](${website})

## Ingredients

${ingredients.map((ingredient) => `- ${ingredient}\n`).join(' ')}

## Instructions

${instructions
   .map((instruction, index) => {
      return `${index + 1}. ${instruction}\n`;
   })
   .join(' ')}
`;

      return markdown;
   };

   return (
      <>
         {/* Header */}
         <header className="container">
            <hgroup>
               <h1>Recipe to MD</h1>
               <h2>A simple way to convert online recipes into Markdown</h2>
            </hgroup>
         </header>
         {/* ./ Header */}
         {/* Main */}
         <main className="container">
            {/* Preview */}
            <section id="convert">
               <h2>Convert</h2>
               <p>
                  Enter a recipe from <em>most</em> websites and we'll convert
                  it into a Markdown file.
               </p>
               <form onSubmit={handleSubmit}>
                  <div className="grid">
                     <input
                        type="text"
                        name="website"
                        placeholder="Recipe website URL (e.g. https://www.allrecipes.com/recipe/12345/)"
                        aria-label="First name"
                        value={website}
                        onChange={handleChange}
                     />

                     <button type="submit" value="Submit">
                        Convert
                     </button>
                  </div>
               </form>
            </section>
            <section>
               <h2>Code</h2>
               {/* Add a button to select and copy the resulting code */}
               <button type="button" onClick={handleCopy}>
                  Copy
               </button>
               <code>
                  <pre>{markdown}</pre>
               </code>
            </section>
            {/* ./ Preview */}
         </main>
      </>
   );
}
