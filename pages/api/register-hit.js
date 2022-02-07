import { connectToDatabase } from '../../lib/mongodb';

export default async (req, res) => {
  const slug = req.query?.slug;

  if (!slug) {
    return res.status(500).json({ message: 'Article slug not provided' });
  }
  const { db } = await connectToDatabase();
  const numberOfDocumentsWithSlug = await db
    .collection('blog-post-hits')
    .countDocuments({ slug: slug });

  if (numberOfDocumentsWithSlug === 0) {
    await db.collection('blog-post-hits').insertOne({ slug: slug, hits: 0 });
  }

  const document = await db
    .collection('blog-post-hits')
    .findOneAndUpdate(
      { slug: { $eq: slug } },
      { $inc: { hits: 1 } },
      { returnOriginal: false }
    );

  if (!document) {
    return res.status(500).json({ message: 'Error finding slug' });
  }

  res.status(200).json({ hits: document.value.hits });
};
