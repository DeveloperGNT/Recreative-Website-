import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { PhotographyHub, VideographyHub, ServicePage } from './pages/ServicePages'
import ServiceLocationPage from './pages/ServiceLocationPage'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import BlogArticle from './pages/BlogArticle'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogArticle />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<Faq />} />
          <Route path="photography" element={<PhotographyHub />} />
          <Route path="photography/:service" element={<ServicePage kind="photography" />} />
          <Route path="photography/:service/:location" element={<ServiceLocationPage kind="photography" />} />
          <Route path="videography" element={<VideographyHub />} />
          <Route path="videography/:service" element={<ServicePage kind="videography" />} />
          <Route path="videography/:service/:location" element={<ServiceLocationPage kind="videography" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
