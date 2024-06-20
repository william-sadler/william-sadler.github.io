// Blog Posts //
const blogPosts = [
  // ... latest posts go here
  {
    title: 'JavaScript Fundamentals',
    href: '/blog/javascript-dom.html',
    description:
      'Unlock the basics of JavaScript! Start your journey in web interactivity!',
    type: 'tech',
    date: 'Jun 20',
    year: 2024,
  },
  {
    title: 'CSS - Position Property',
    href: '/blog/html-css.html',
    description:
      'Learn how to use the relative, absolute, and fixed properties!',
    type: 'tech',
    date: 'Jun 16',
    year: 2024,
  },
  {
    title: 'Te Houtaewha',
    href: '/blog/te-houtaewa-template.html',
    description: 'E kore e mau i a koe, he wae kai pakiaka.',
    type: 'tech',
    date: 'Nov 10',
    year: 2010,
  },
  {
    title: 'Learning Plan',
    href: '/blog/learning-plan.html',
    description:
      'I answer key questions about my goals, study methods and strategies for improvement.',
    type: 'core',
    date: 'Jun 15',
    year: 2024,
  },
  {
    title: 'Identity and Values',
    href: '/blog/identity-values.html',
    description:
      'Dive into personal questions about ethics, morals, and the experiences that have shaped who I am today.',
    type: 'core',
    date: 'Jun 15',
    year: 2024,
  },
  {
    title: 'Emotional Intelligence',
    href: '/blog/emotional-intelligence.html',
    description:
      'Learn about the fascinating world of Emotional Intelligence (EQ) and Intelligence Quotient (IQ).',
    type: 'core',
    date: 'Jun 15',
    year: 2024,
  },
]
// Two states in total
// Current state (always at least 1 in this state)
// Action state

// -- CATEGORIZING POSTS -- //

function categorizePosts(posts) {
  const categorizedPosts = {
    tech: [],
    core: [],
  }

  for (const post of posts) {
    post.type.startsWith('tech')
      ? categorizedPosts.tech.push(post)
      : categorizedPosts.core.push(post)
  }

  return categorizedPosts
}
categorizePosts(blogPosts)
const categorizedBlogPosts = categorizePosts(blogPosts)

// -- DISPLAY ANIMATION -- //
const runAnimation = (
  hideElement,
  hideContent,
  newElement,
  newContent,
  callback
) => {
  hideElement.classList.add('swipe-out')
  hideElement.addEventListener(
    'animationend',
    () => {
      console.log(hideElement)
      console.log(hideContent)
      hideElement.classList.remove('swipe-out')
      hideElement.innerHTML = hideContent
      newElement.innerHTML = newContent
      newElement.classList.add('swipe-in')
      newElement.addEventListener(
        'animationend',
        () => {
          newElement.classList.remove('swipe-in')
          if (callback) callback()
        },
        { once: true }
      )
    },
    { once: true }
  )
}

// -- DISPLAYING POSTS -- //
const displayBlogPosts = (blogs, categorizedPosts) => {
  // -- CURRENT STATE -- //
  const displayTech = document.getElementById('techList')
  const displayCore = document.getElementById('coreList')

  const displayElement = blogs === 'core' ? displayCore : displayTech
  const hideElement = blogs === 'core' ? displayTech : displayCore

  // Determine which posts to display
  const postsToDisplay =
    blogs === 'core' ? categorizedPosts.core : categorizedPosts.tech

  // Create the new content
  let newContent = ''
  for (let i = 0; i < postsToDisplay.length; i++) {
    newContent += `<li class="blog-button" id="${blogs}${i}">
          <a href="${postsToDisplay[i].href}">
            <span class="date">${postsToDisplay[i].date}</span>
            <span class="description">${postsToDisplay[i].description}</span>
            <span class="title">${postsToDisplay[i].title}</span>
            <span class="read-more">🡲</span>
          </a>
        </li>
        `
  }
  runAnimation(hideElement, '', displayElement, newContent)
}

const techButton = () => {
  displayBlogPosts('tech', categorizedBlogPosts)
}

const coreButton = () => {
  displayBlogPosts('core', categorizedBlogPosts)
}

displayBlogPosts('tech', categorizedBlogPosts)
document.getElementById('tech').onclick = techButton
document.getElementById('core').onclick = coreButton
