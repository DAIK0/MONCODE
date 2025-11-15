import ProductSection from "./ProductSection"
import NewsSection from "./NewsSection"

export default function MainContent() {
  return (
    <main className="mt-20 pt-10 px-10 pb-10 overflow-y-auto">
      <ProductSection />
      <NewsSection />
    </main>
  )
}
