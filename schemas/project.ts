import {Rule} from 'sanity'
import getCurrentISODate from '../utilities/getCurrentISODate'

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {
      title: 'Details',
      name: 'projectDetails',
    },
    {
      title: 'Images',
      name: 'projectImages',
    },
    {
      title: 'Videos',
      name: 'projectVideos',
    },
    {
      title: '3D Model',
      name: 'projectModel',
    },
  ],
  fields: [
    {
      name: 'ranking',
      title: 'Ranking',
      type: 'number',
      validation: (Rule: Rule) => [
        Rule.custom((ranking: number, context) => {
          const {document, getClient} = context

          if (!document) return true

          const client = getClient({apiVersion: getCurrentISODate()})

          return client.fetch('*[_type == "project"] {title, ranking}').then((results: any) => {
            const isCurrentRankingTaken = results.some(
              (result: any) => result.ranking === ranking && result.title !== document.title
            )

            if (isCurrentRankingTaken) {
              return 'Ranking is already taken'
            }

            return true
          })
        }),
      ],
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'projectDetails',
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'URL',
      group: 'projectDetails',
      options: {
        source: 'title',
      },
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      group: 'projectDetails',
      of: [{type: 'block'}],
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      description: 'Optimized main image for project preview.',
      type: 'image',
      group: 'projectImages',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'projectImages',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    },
    {
      name: 'videos',
      title: 'Video URLs',
      description: 'Paste in the URL of a YouTube video.',
      type: 'array',
      group: 'projectVideos',
      of: [
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    },
    {
      name: 'model',
      title: '3D Model',
      description: 'Paste in the URL of a Sketchfab model.',
      type: 'url',
      group: 'projectModel',
    },
  ],
}
