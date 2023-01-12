require("dotenv").config()
const nodeFetch = require("node-fetch")
// import crypto from "node:crypto"
const unsplash = require("unsplash-js")

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  const unsplashApi = unsplash.createApi({
    accessKey: process.env.UNSPLASH_API_KEY,
    fetch: nodeFetch,
  })

  const { response, errors } = await unsplashApi.photos.getRandom({
    query: "fox",
    count: 12,
  })

  if (errors) {
    console.log("An error occurred fetching unsplash images: ", errors)
    throw new Error("An error occurred fetching unsplash images")
  } else {
    response.map((foxPhoto, i) => {
      createNode({
        image: foxPhoto.urls.regular,
        id: `foxNode${foxPhoto.id}`,
        parent: null,
        children: [],
        internal: {
          type: `foxNodes`,
          contentDigest: foxPhoto.id,
          description: `Fox Photo #${i + 1}`,
        },
      })
    })
    return
  }

  // foxes.forEach((fox, i) => {
  //   createNode({
  //     image: fox.url,
  //     id: `foxNode${i}`,
  //     parent: null,
  //     children: [],
  //     internal: {
  //       type: `foxNodes`,
  //       contentDigest: crypto
  //         .createHash(`md5`)
  //         .update(JSON.stringify(fox.url))
  //         .digest(`hex`),
  //     },
  //   })
  // })

  // foxes.forEach((fox, i) => {
  //   const otherImage = i > 0 ? foxes[i - 1].url : fox.url

  //   createNode({
  //     images: [fox.url, otherImage],
  //     id: `multiImageFoxNode${i}`,
  //     parent: null,
  //     children: [],
  //     internal: {
  //       type: `multiImageFoxNodes`,
  //       contentDigest: crypto
  //         .createHash(`md5`)
  //         .update(JSON.stringify(fox.url))
  //         .digest(`hex`),
  //     },
  //   })
  // })

  // createNode({
  //   id: `noImagesFoxNode`,
  //   parent: null,
  //   children: [],
  //   internal: {
  //     type: `noImagesFoxNodes`,
  //     contentDigest: crypto
  //       .createHash(`md5`)
  //       .update(JSON.stringify("noImagesFoxNode"))
  //       .digest(`hex`),
  //   },
  // })

  // return
}
