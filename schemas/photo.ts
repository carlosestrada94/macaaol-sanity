export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Photo Title',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      description: 'This image must be compressed for performance.',
      type: 'image',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
}
