export type Template = {
  id: string
  name: string
  category: string
  price: number
  premium: boolean
  rating: number
  reviews: number
  image: string
  seller: string
  description: string
}

export const sampleTemplates: Template[] = [
  {
    id: 'luxury-watches',
    name: 'Luxury Watches',
    category: 'Business',
    price: 1599,
    premium: true,
    rating: 4.8,
    reviews: 120,
    image: '/images/tpl-watches.png',
    seller: 'Emily Chen',
    description:
      'Modern and responsive eCommerce template for your luxury watch brands. Fully customizable and comes with 10+ pages.',
  },
  {
    id: 'organic-food',
    name: 'Organic Food',
    category: 'Ecommerce',
    price: 1599,
    premium: true,
    rating: 4.7,
    reviews: 86,
    image: '/images/tpl-food.png',
    seller: 'Mark Davis',
    description: 'Fresh, clean storefront template for organic grocery and farm-to-table brands.',
  },
  {
    id: 'handmade-crafts',
    name: 'Handmade Crafts',
    category: 'Ecommerce',
    price: 1599,
    premium: true,
    rating: 4.6,
    reviews: 64,
    image: '/images/tpl-crafts.png',
    seller: 'Jane Brooks',
    description: 'Warm, artisan-focused shop template for handmade goods and craft makers.',
  },
  {
    id: 'high-end-tech',
    name: 'High-End Tech',
    category: 'Business',
    price: 2499,
    premium: true,
    rating: 4.9,
    reviews: 142,
    image: '/images/tpl-tech.png',
    seller: 'Samuel Jones',
    description: 'Sleek dark template for premium gadgets and consumer electronics stores.',
  },
  {
    id: 'foodie-portfolio',
    name: 'Foodie (Portfolio)',
    category: 'Portfolio',
    price: 0,
    premium: false,
    rating: 4.5,
    reviews: 51,
    image: '/images/tpl-foodie.png',
    seller: 'Emily Chen',
    description: 'Free portfolio template for chefs, food bloggers and photographers.',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    category: 'Landing Page',
    price: 0,
    premium: false,
    rating: 4.4,
    reviews: 38,
    image: '/images/tpl-fitness.png',
    seller: 'Mark Davis',
    description: 'Free bold landing page for gyms, personal trainers and fitness studios.',
  },
]

export const templateCategories = [
  'All',
  'Business',
  'Portfolio',
  'Ecommerce',
  'Blog',
  'Landing Page',
  'Others',
]

export type Freelancer = {
  id: string
  name: string
  role: string
  rate: number
  rating: number
  reviews: number
  avatar: string
  skills: string[]
  location: string
}

export const sampleFreelancers: Freelancer[] = [
  {
    id: 'emily-chen',
    name: 'Emily Chen',
    role: 'Full-Stack Developer',
    rate: 6000,
    rating: 4.9,
    reviews: 120,
    avatar: '/images/avatar-1.png',
    skills: ['React', 'Node.js', 'MongoDB'],
    location: 'Toronto, Canada',
  },
  {
    id: 'mark-davis',
    name: 'Mark Davis',
    role: 'Frontend Developer',
    rate: 4500,
    rating: 4.8,
    reviews: 86,
    avatar: '/images/avatar-2.png',
    skills: ['Vue', 'Tailwind', 'Figma'],
    location: 'Austin, USA',
  },
  {
    id: 'samuel-jones',
    name: 'Samuel Jones',
    role: 'Mobile Developer',
    rate: 5000,
    rating: 4.7,
    reviews: 64,
    avatar: '/images/avatar-3.png',
    skills: ['Flutter', 'Swift', 'Kotlin'],
    location: 'London, UK',
  },
  {
    id: 'jane-brooks',
    name: 'Jane Brooks',
    role: 'UI/UX Designer',
    rate: 4000,
    rating: 4.9,
    reviews: 98,
    avatar: '/images/avatar-4.png',
    skills: ['Figma', 'Webflow', 'Branding'],
    location: 'Berlin, Germany',
  },
]

export const freelancerCategories = [
  'All Categories',
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Graphic Design',
  'Digital Marketing',
  'Content Writing',
  'Other',
]

export const freelancerSkillTabs = ['All', 'Web Dev', 'UI/UX', 'Mobile', 'Backend', 'Design', 'Other']

export type Conversation = {
  id: string
  name: string
  avatar: string
  preview: string
  time: string
  unread: number
}

export const sampleConversations: Conversation[] = [
  { id: 'emily', name: 'Emily Chen', avatar: '/images/avatar-1.png', preview: 'Hi! I’m interested in your template…', time: '10:30 AM', unread: 2 },
  { id: 'mark', name: 'Mark Davis', avatar: '/images/avatar-2.png', preview: 'Can you share more details?', time: '9:15 AM', unread: 0 },
  { id: 'samuel', name: 'Samuel Jones', avatar: '/images/avatar-3.png', preview: 'Thanks for the update!', time: 'Yesterday', unread: 0 },
  { id: 'jane', name: 'Jane Brooks', avatar: '/images/avatar-4.png', preview: 'I’m available for your project.', time: 'Mon', unread: 1 },
]

export type ChatMessage = { id: string; from: 'me' | 'them'; text: string; time: string }

export const sampleMessages: ChatMessage[] = [
  { id: '1', from: 'them', text: 'Hi! I’m interested in your template. Is it still available?', time: '10:24 AM' },
  { id: '2', from: 'me', text: 'Yes, it’s available! Would you like to discuss the details?', time: '10:26 AM' },
  { id: '3', from: 'them', text: 'Great! Can you share more details about the customization options?', time: '10:30 AM' },
]

export type Transaction = {
  id: string
  type: 'Commission' | 'Template Sale' | 'Withdrawal' | 'Platform Fee'
  description: string
  amount: number
  date: string
}

export const sampleTransactions: Transaction[] = [
  { id: 't1', type: 'Template Sale', description: 'Luxury Watches Template', amount: 1599, date: 'Apr 27, 2026' },
  { id: 't2', type: 'Platform Fee', description: 'Platform Fee (10%)', amount: -159.9, date: 'Apr 27, 2026' },
  { id: 't3', type: 'Commission', description: 'Freelance project — Emily Chen', amount: 10000, date: 'Apr 26, 2026' },
  { id: 't4', type: 'Withdrawal', description: 'Bank withdrawal', amount: -4000, date: 'Apr 25, 2026' },
  { id: 't5', type: 'Template Sale', description: 'Organic Food Template', amount: 1599, date: 'Apr 24, 2026' },
  { id: 't6', type: 'Template Sale', description: 'Handmade Crafts Template', amount: 1599, date: 'Apr 23, 2026' },
]

export type Order = {
  id: string
  customer: string
  item: string
  amount: number
  status: 'Completed' | 'Pending' | 'Refunded'
}

export const sampleOrders: Order[] = [
  { id: '#7231', customer: 'Samuel Jones', item: 'High-End Tech', amount: 2499, status: 'Completed' },
  { id: '#7230', customer: 'Mark Davis', item: 'Handmade Crafts', amount: 1599, status: 'Completed' },
  { id: '#7229', customer: 'Emily Chen', item: 'Organic Food', amount: 1599, status: 'Pending' },
  { id: '#7228', customer: 'Jane Brooks', item: 'Luxury Watches', amount: 1599, status: 'Completed' },
  { id: '#7227', customer: 'Abhilash V S', item: 'Fitness', amount: 0, status: 'Refunded' },
]

export const currentUser = {
  name: 'Abhilash V S',
  firstName: 'Abhilash',
  avatar: '/images/avatar-3.png',
  email: 'abhilash@example.com',
}

const inrWhole = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
const inrDecimal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })

export function formatINR(value: number) {
  return Number.isInteger(value) ? inrWhole.format(value) : inrDecimal.format(value)
}

export function formatPrice(value: number) {
  return value === 0 ? 'Free' : formatINR(value)
}
