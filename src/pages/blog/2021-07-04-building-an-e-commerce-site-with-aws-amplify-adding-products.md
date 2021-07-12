---
templateKey: blog-post
title: Building an E-Commerce site with AWS Amplify - Products and Inventory
isDraft: true
date: 2021-07-04T08:09:58.719Z
description: " "
featuredimage: /img/home-jumbotron.jpg
tags:
  - amplify
  - aws
  - e-commerce
  - react
---
* **Products and Inventory** - the first thing our store needs is some products, I'll go through how to add products, manage their inventory and also search products.

Adding an API

```
tim@Tims-MBP amplify-ecommerce % amplify add api
Scanning for plugins...
Plugin scan successful
? Please select from one of the below mentioned services: GraphQL
? Provide API name: amplifyecommerce
? Choose the default authorization type for the API API key
? Enter a description for the API key: Demo API key
? After how many days from now the API key should expire (1-365): 7
? Do you want to configure advanced settings for the GraphQL API No, I am done.
? Do you have an annotated GraphQL schema? No
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)

The following types do not have '@auth' enabled. Consider using @auth with @model
	 - Todo
Learn more about @auth here: https://docs.amplify.aws/cli/graphql-transformer/auth


GraphQL schema compiled successfully.

Edit your schema at /Users/tim/Desktop/amplify-ecommerce/amplify/backend/api/amplifyecommerce/schema.graphql or place .graphql files in a directory at /Users/tim/Desktop/amplify-ecommerce/amplify/backend/api/amplifyecommerce/schema
? Do you want to edit the schema now? Yes
Edit the file in your editor: /Users/tim/Desktop/amplify-ecommerce/amplify/backend/api/amplifyecommerce/schema.graphql
Successfully added resource amplifyecommerce locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```

```graphql
type Product @model {
  id: ID!
  name: String!
  description: String
  image: String!
  price: Float!
  inventory: Int!
}
```

```
tim@Tims-MBP amplify-ecommerce % amplify push
✔ Successfully pulled backend environment dev from the cloud.

Current Environment: dev

| Category | Resource name    | Operation | Provider plugin   |
| -------- | ---------------- | --------- | ----------------- |
| Api      | amplifyecommerce | Create    | awscloudformation |
| Hosting  | amplifyhosting   | No Change |                   |

Tag Changes Detected
? Are you sure you want to continue? Yes

The following types do not have '@auth' enabled. Consider using @auth with @model
	 - Product
Learn more about @auth here: https://docs.amplify.aws/cli/graphql-transformer/auth


GraphQL schema compiled successfully.

Edit your schema at /Users/tim/Desktop/amplify-ecommerce/amplify/backend/api/amplifyecommerce/schema.graphql or place .graphql files in a directory at /Users/tim/Desktop/amplify-ecommerce/amplify/backend/api/amplifyecommerce/schema
? Do you want to generate code for your newly created GraphQL API Yes
? Choose the code generation language target typescript
? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.ts
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
? Enter the file name for the generated code src/API.ts
⠏ Updating resources in the cloud. This may take a few minutes...
...
GraphQL endpoint: https://yvs2cy3ocbbztkxrqurzpgaroa.appsync-api.ap-southeast-2.amazonaws.com/graphql
GraphQL API KEY: da2-ly5eba5645bqlesdzayqqfqwbi
```

## Adding some products

```
amplify console api
? Please select from one of the below mentioned services: GraphQL
```



![](/img/screen-shot-2021-07-09-at-2.51.43-pm.png)

## Displaying the Products

```
function App() {
  const [products, setProducts] = useState<ListProductsQuery | undefined>();

  useEffect(() => {
    fetchProducts();
  }, [])

  async function fetchProducts() {
    try {
      const productsData = await API.graphql(graphqlOperation(listProducts)) as { data: ListProductsQuery };
      setProducts(productsData.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full bg-grey-50">
      {products?.listProducts?.items?.map(product => product && <Product key={product.id} {...product}/>)}
    </div>
  );
}
```

