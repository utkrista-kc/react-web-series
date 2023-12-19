Episode 10: Jo Dikhta Hai, Vo Bikta Hai

1. Naive way of adding CSS is creating a .css file and writing styles fo classNames provided in the JSX code. Another way is SASS ans SCSS. SASS adds superpowers to CSS and writing css becomes easier. In large scale applications companies do not use SASS or single CSS file as they are not scalable. Commonly used approach in big companies is to use styled components. We will be using Tailwind CSS here. Another way to use CSS is to use libraries such as material UI, bootstrap, ANT Design, Chakra UI, etc. Material UI is React component library. A lot of companies use these libaries or frameworks. They provide pre-styled components.

2. Tailwind CSS is writing CSS without leaving html without switching between files. It is generic framework that can be used with React, Angular, Next.js, etc.
```
npm install -D tailwindcss postcss
npx tailwindcss init
```
PostCSS is a tool for transforming CSS with Javascript. ``` npx tailwindcss init``` We execute and initialize tailwindcss in our project. It creates a configuration file for our project. We need to also create .postcssrc file that is configuration file for postcss. Parcel needs to use postcss in order to read tailwind.  So we have to specify in postcssrc that we have used tailwind.
```
{
    "plugins":{
        "tailwindcss": {}
    }
}
```
Inside tailwindcss configuration too, we have to add to content. 
```
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

```
It means it takes the list as array that means that we can use tailwind across range of files that is under src folder.

We also delete everything in our index.css and add the following lines in order to import tailwind to our css file. 
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
After writing this, we need not make any changes to index.css. 
Tailwind CSS gives class names for every CSS you would write.
It might seem that there is initial learning curve in Tailwind but it gets easier as we start using it. Use Tailwind CSS intellisense extension to make work easier in the project. We will get tailwind class suggestions that we can use. Hovering to class names will tell what css it is using behind the scenes. If extension do not give suggestion, we can use ctrl spacebar so that it will show suggestions.
Suppose if we do not have a clas for hard coded value, we can write as ```w-[200px]``` Tailwind CSS makes our work easier.

If we have to apply lots of CSS to our component, it will make our code look ugly. The code becomes too big. Tailwind CSS is very lightweight. When we are loading the page, it will only include the CSS required. Even if we have included m-4 multiple times, it will be imported just once. It keeps the bundle size small. It will never ship unused CSS. The final CSS fundle is smallest. Also all the developers come in sync when writing the css code. We can also write media queries as well.

3. If you are building code, please built the darkmode feature. We can do the dark mode easily with Tailwind CSS. We can write CSS on the go with Tailwind CSS.


# Theory Assignment

1. Explore all ways of writing css

    > Inline style:
    It is most direct way to style applicaiton. Stlying elements inline does not require us to create a separate stylesheet.
    Style applied directly to elements can override any other style rules applied to that element. Inline styles are not acceptable much because even the small component becomes bulky. We cannot write animations or cannot style nested elements(such as child elements first-child, last-child), pseudo-classes(i.e. hover) and pseudo-elements(:first-line). However, if you are prototying an application, inline css are great. 

    Pros: 
    - Quick to write
    - Good for prototyping and move to stylesheet later on 
    - Have greater precedence i.e. can override other styles

    Cons: 
    - Lots of inline style make JSX unreadable
    - We cannot use basic css features like animations, selectors, etc.
    - It doesnot scale well.

    > Plain CSS

    Instead of writing inline CSS, it is  more common to import CSS stylesheet to style component's elements. We can have dynamic variables, advanced selectors to select child elements and new pseudo classes like :is and :where: 

    Pros:
    - Gives all the tools of mordern CSS(variables, advanced selectors, new pseudo classes) 
    - Helps to clean component from inline styles

    Cons:
    - Need more typing and boilerplate than other CSS libraries i.e. Sass
    - Must use reliable naming convention to make sure that styles donot conflict. Once we have large application, it becomes difficult to think of unique class names for elements unless we use a naming convention. It leads to multiple styling with same name, which can lead to conflict.

    > SASS/scss
    SASS - Syntactically Awesome Style Sheet
    SCSS - Sassy Cascading Style Sheet

    SASS gives powerful tools which donot exist in normal CSS stylesheets. It includes features like variables, extending styling and nesting. It allows us to write different kind of stylesheets with extension .scss and .sass. SCSS styles are written in similar syntax to normal CSS. However, SASS donot require us to use open and closing brackets when writing style rules. Since it is not regular CSS, it needs to be compiled from SASS to normal CSS. So, in React projects, we can use library like node-sass.
    - Variables: We can declare variables like in JS by declaring $ at the beginning.
    - Extending/ Inheritance: We can write style rules by extending. To extend rules, we have to create our own selector which can be used like a variable. The name of the rule that you want to extent start with %.

    - Nesting: Instead of writing multiple rules that begin with same selector, we can nest them. For example: 
    ```
    .testimonial-name {
    @extend %font-basic;
    margin-bottom: 0;
    font-weight: 600;

    span {
        font-weight: 400;
    }
    }
    ```
    In .testimonial-name, we use nested selector to target span element within it.

    Pros: 
    - Includes many dyanamic CSS features like extending, nesting, etc
    - Require less boilerplate to write

    Cons: 
    - Sass/ Scss require setup such as installing node-sass library
    - Like plain CSS, the styles are global and not scoped to one component
    - CSS stylesheet is also including number of features of SCSS such as variables.

    > Using CSS modules 
    They are alternative to CSS or SASS. CSS modules can be used with CSS or SASS. If one is using create react app, one can 
    use without setup as well. Here the css file should have .module in it before the appropriate extension(CSS or SASS/SCSS).
    CSS modules are created as normal CSS but they are imported and used as if they are created as objects. The benefit is that, 
    we can get rid of class name conflicts such as normal CSS because the clasnames turn into unique classnames that cannot conflict hen project is built. CSS modules solve problem of global scope in CSS. CSS declared using modules to individual components will not cascade to child components.

    Pros: 
    - Styles are scoped to components
    - Unique classnames are generated removing the conflict
    - Can be used without setup
    - Can be used with SASS or CSS

    Cons: 
    - It can be tricky to reference unique classnames
    - High learning cruve to use CSS styles like object properties.

    > CSS in JS
    Similar to React allowed us to write HTML using JS with JSX, CSS in JS has done something similar.
    It allows us to write CSS direclty into our JS files. These styles are also scoped to individual components.
    Changing style of one component doesnot impact style of rest of component. CSS in JS makes used of JS function tagged template literal. However, we can still write plain CSS. We can associate style with any HTML element. We can export this component and use it anywhere and pass props for dynamic features. Two most common CSS in JS libraries are styled components and emotions. One downside is that we need to add additional library to our project.

    Pros: 
    - Styles are scoped to individual elements
    - We can export, reuse and pass pros in our styles
    - There are no styling conflicts as new classnames are generated.
    - We need not focus on naming convention as we can just write style.

    Cons: 
    - Unlike plain css, we have to download third party library which will add weight to our project.

    > Component libraries
    We can also style our project with pre-made component and styles like Material UI or ANT design.


    Pros of using libraries:
    - Easy to use and code
    - Reusability (as a frontend developer instead of writing css we need to focus on logic)
    - Built in components
    - Consistent UI (Youtube changed all buttons to rounded)
    - Takes care of your responsiveness
    - Consistent coding when lot of developers work in same project

    Cons of using libraries
    - It makes bundle size heavy
    - We loose control over how our design looks. Personal customization becomes hard. It restrics you with something.


2. How do we configure tailwind?
- We have to first insall tailwind css and postcss. 
npm install -D tailwindcss postcss
- Then, we use init command to generate tailwind.config.js
npx tailwindcss init

- We create .postcssrc file on project root and enable tailwind css
```
{
  "plugins": {
    "tailwindcss": {}
  }
}
```

- We configure template paths by adding paths of files in tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

- We add tailwind directives to our CSS. We create .css file and add these.
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```


Finally, we can run our project.

3. In tailwind.config.js, what does all the keys mean (content, theme, extend, plugins)?

Content: It is to configure path to all the HTML elements, JS components and any other source files that use Tailwind class names.

Theme: It is to define our project's color pallete, type scale, fonts, breakpoints, border radius values, etc. Initially, 
default theme provided. It contains keys for screens, colors and spacing as well as  it is customizable for core plugins.
Screens let us customze responsive breakpoints in our project. Such as screen 'sm' is mapped to screensize of '640px'. We can customize global color palate of our project with colors. Spacing allows us to customize global spacing and sizing scale for our project. Such as 0.5 can be mapped to '0.125rem'.

Extend: If we would like to preserve default values of theme option but also add additional new values, we can do it 
under extend key in theme section. Suppose, if we want extra breakpoint in screens property preserving existing ones, we can do 

```
module.exports = {
  theme: {
    extend: {
      // Adds a new breakpoint in addition to the default breakpoints
      screens: {
        '3xl': '1600px',
      }
    }
  }
}
```

Plugins: 
It lets us extend tailwind with resusable third party plugins. Plugins lets us register new styles for tailwind to inject into 
user's stylesheet using JS instead of CSS. Plugins can also be added to our project via npm and adding it to file.

```
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
```



4. Why do we have .postcssrc file?
PostCSS is a Node.js tool that transforms our styles using JS plugins. It is a JS tool that tranforms our css into abstract 
syntax tree and then provides an API for analyzing and modifying using JS plugins. It is neither a pre-processor nor 
post-processor. It is a transpiler that turns special post css plugin syntax to vanilla css. It will compile tailwind assets to CSS. .postcssrc will contain postcss settings. It will read for all tailwind css files, can for classes that are in use and compile giving optimized css file. We need to tell parecel that we are using tailwind css so there is need to convert it to normal css. In, .postcssrc file we configure tailwind css to tell our parcel that while bundling things up, we will be using tailwind so need to compile tailwind css to normal css.


#Additional 
```

@tailwind base, @tailwind components, @tailwind utilities

@tailwind base: It holds preflight which is for things like reset rules or default styles applied to plain HTML elements. If 
you want to add custom default base styles to specific html elements, we can use @layer directive to add those styles to 
Tailwind base layer. It includes reset/normalized default styles and --tw--xxx css variables.

@tailwind components: The components layer is for class based styles that we want to override with utilities. This is for 
more complicated classes that we want to add to our project. It is empty by default, we might want to have components like 
.btn, card, etc to be included here.

$tailwind utilities: It is for small, single purpose classes that should always take precedence over any other styles. Here 
resides all of the classes that you want to style your HTML: from padding to flex classes, to shadows and color, to pseudoclasses to animations and transitions. It includes shining utilities like text-gray-900, font-bold, etc.


When two classes have same specification, the one defined later or at last wins.
Components should be declared before utilities.
```

* Tailwind CSS is an open source CSS framework. It comes up with mix of things.
- Writing CSS on the go(in the same file)
- Reusability (It comes with lot of prebuilt classes that we can use)
- Less bundle size (as it is minimal CSS that it offers to us)
- Flexible UI (Customize it however we want to which was a con of using libraries such as material UI)
- Less code
- No duplicate CSS
- Faster development as we donot need to switch between files.

Cons 
- High learning curve
- Makes class name look ugly as it compromises 
- There is initial high learning curve associated so new developers need some time to get productive.
- When we add css classes, the component class name becomes messy and ugly. It compromises readability a little.


When we use tailwind css, it changes default behaviour of many tags. We have to write it in tailwind style to make it work.
Every style that you write will be new class name inside tailwind css. Everything in tailwind works with class names.

Stick to native tailwind classes because tailwind understand it and tailwind doesnot create a class for every dynamic classes.
