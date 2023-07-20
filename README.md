# Blog API

This repository is part of a Blog App project completed for partial fulfillment of the curriculum of [The Odin Project](https://www.theodinproject.com/). The project is made up of a backend [API](https://en.wikipedia.org/wiki/API) and two frontend [SPA](https://en.wikipedia.org/wiki/Single-page_application)s. See below for live links and other repositories:

- Click [here](https://github.com/meuzishun/blog-client) for the Client repository and [here](https://meuzishun.github.io/blog-client/) for the live site
- Click [here](https://github.com/meuzishun/blog-client-author) for the Client-Author repository and [here](https://meuzishun.github.io/blog-client-author/) for the live site

## Overview

The structure of this app is rather standard. A few aspects are worth pointing out.

1. The database connection needs to occur before the server starts due to the requirements of the PaaS:

```js
connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
  );
});
```

2. Routes are nested:

```js
// App.js
const routes = require('./routes/index');
app.use(routes);
```

```js
// routes/index.js
const posts = require('./posts');
router.use('/posts', posts);
```

```js
// routes/posts.js
const comments = require('./comments');
router.use('/:postId/comments', comments);
```

3. Validation and authentication middlewares are abstracted and added to routes inline:

```js
// routes/index.js
const { emailValidator, checkValidations } = require('../lib/inputValidators');
router.post('/login', emailValidator, checkValidations, loginUser);
```

4. Controllers use the `express-async-handler` so errors can be passed directly to error handling middleware without using the `next` parameter:

```js
// postsController.js
const asyncHandler = require('express-async-handler');
const Post = require('../models/post');

// @desc    Read a single post
// @route   GET /posts/:postId
// @access  Public
const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    'author'
  );

  return res.status(200).json({ post });
});

// other controller functions...
```

5. The JWT authentication uses public and private keys which need to be generated on the server. The `fs` module in NodeJS isn't allowed in the PaaS so another library is needed:

```js
const fs = require('@cyclic.sh/s3fs')(process.env.CYCLIC_BUCKET_NAME);
```

If the environment is development rather than production, the standard `fs` module is defaulted to.
