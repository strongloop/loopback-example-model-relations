# loopback-example-relations

```
$ git clone https://github.com/strongloop/loopback-example-relations.git
$ cd loopback-example-model-relations
$ npm install
$ node .
```

In this example, we create a simple web app to demonstrate basic model relation
concepts. The app consists of a single web page with a list of links to help us
query and filter sample data via REST.

## Prerequisites

### Tutorials

- [Getting started with LoopBack](https://github.com/strongloop/loopback-getting-started)
- [Tutorial series - Step 1](https://github.com/strongloop/loopback-example#step1)

### Knowledge

- [LoopBack boot scripts](http://docs.strongloop.com/display/LB/Defining+boot+scripts)
- [LoopBack models](http://docs.strongloop.com/display/LB/Defining+models)
- [Loopback model relations](http://docs.strongloop.com/display/LB/Define+model+relations)

## Procedure

### Create the application

#### Application information

- Name: `loopback-example-model-relations`
- Directory to contain the project: `loopback-example-model-relations`

```
$ slc loopback loopback-example-model-relations
... # follow the prompts
$ cd loopback-example-model-relations
```

### Create the models

#### Model information

- Name: `Customer`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties:
    - `name`
      - String
      - Not Required
    - `age`
      - String
      - Not Required
- Name: `Review`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties:
    - `product`
      - String
      - Not Required
    - `star`
      - Number
      - Not Required
- Name: `Order`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties:
    - `description`
      - String
      - Not Required
    - `total`
      - Number
      - Not Required

```
$ slc loopback:model Customer
... # follow the prompts, repeat for `Review` and `Order` models
```

### Configure server-side views

> LoopBack comes preconfigured with EJS out-of-box. This means we can use
> server-side templating by simply setting the proper view engine and a
> directory to store the views.

Create a [`views` directory](/server/views) to store server-side templates.

```
$ mkdir server/views
```

Add [server-side templating configurations to `server.js`](/server/server.js#L11-L20).

Create [`index.ejs` in the views directory](/server/views/index.ejs).

[Configure `server.js`](/server/server.js#L11-L20) to use server-side
templating. Remember to import the [`path`](/server/server.js#L3) package.

### Add sample data

Create three boot scripts:

- [`sample-customers.js`](/server/boot/sample-customers.js)
- [`sample-orders.js`](/server/boot/sample-orders.js)
- [`sample-reviews.js`](/server/boot/sample-reviews.js)

### Create model relations

#### Model relation information

- `Customer`
  - has many
    - `Review`
      - Property name for the relation: `reviews`
      - Custom foreign key: `authorId`
    - `Order`
      - Property name for the relation: `orders`
      - Custom foreign key: `customerId`
      - Require a through model: No
- `Review`
  - belongs to
    - `Customer`
      - Property name for the relation: `author`
      - Custom foreign key: `authorId`
- `Order`
  - belongs to
    - `Customer`
      - Property name for the relation: *Leave blank - defaults to `customer`*
      - Custom foreign key: *Leave blank*

```
$ slc loopback:relation
? Select the model to create the relationship from:
...
> Customer
... # follow the prompts, repeat for `Review` and `Order`
```

> LoopBack [automatically derives](http://docs.strongloop.com/display/LB/BelongsTo+relations#BelongsTorelations-Overview)
> relation and foreign key names when you leave the values empty.

### Try the API

Start the application with `node .` and browse to [`localhost:3000`][localhost].
You should see various links. Each endpoint is defined as follows:

- [/api/customers](http://localhost:3000/api/customers)
  - List all customers
- [/api/customers?filter[fields][0]=name](http://localhost:3000/api/customers?filter[fields][0]=name)
  - List all customers, but only return the name property for each result
- [/api/customers/1](http://localhost:3000/api/customers/1)
  - Look up a customer by ID
- [/api/customers/youngFolks](http://localhost:3000/api/customers/youngFolks)
  - List a predefined scope named *youngFolks*
- [/api/customers/1/reviews](http://localhost:3000/api/customers/1/reviews)
  - List all reviews posted by a given customer
- [/api/customers/1/orders](http://localhost:3000/api/customers/1/orders)
  - List all orders placed by a given customer
- [/api/customers?filter[include]=reviews](http://localhost:3000/api/customers?filter[include]=reviews)
  - List all customers including their reviews
- [/api/customers?filter[include][reviews]=author](http://localhost:3000/api/customers?filter[include][reviews]=author)
  - List all customers including their reviews which also include the author
- [/api/customers?filter[include][reviews]=author&filter[where][age]=21](http://localhost:3000/api/customers?filter[include][reviews]=author&filter[where][age]=21)
  - List all customers whose age is 21, including their reviews which also include the author
- [/api/customers?filter[include][reviews]=author&filter[limit]=2](http://localhost:3000/api/customers?filter[include][reviews]=author&filter[limit]=2)
  - List first two customers including their reviews which also include the author
- [/api/customers?filter[include]=reviews&filter[include]=orders](http://localhost:3000/api/customers?filter[include]=reviews&filter[include]=orders)
  - List all customers including their reviews and orders

---

- [Next tutorial][next-tutorial]
- [All tutorials][all-tutorials]

[all-tutorials]: https://github.com/strongloop/loopback-example
[localhost]: http://localhost:3000
[next-tutorial]: https://github.com/strongloop/loopback-example-app-logic
