import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = ({ data }) => {
  console.log("data: ", data)
  return (
    <Layout>
      <div className={styles.textCenter}>
        <StaticImage
          src="../images/example.png"
          loading="eager"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` }}
        />
        <h1>
          Welcome to <b>Gatsby!</b> Remote Fox Image Plugin Demo
        </h1>

        {data.allRemoteImageFile.nodes.map((foxImage, i) => {
          return (
            <div key={foxImage.id} style={{ marginBottom: "48px" }}>
              <GatsbyImage
                image={foxImage.gatsbyImage}
                alt={`Fox Photo Number ${i + 1}`}
              />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const foxQuery = graphql`
  {
    allRemoteImageFile {
      nodes {
        id
        gatsbyImage(height: 400)
      }
    }
  }
`

export default IndexPage
