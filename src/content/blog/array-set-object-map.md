---
title: Array vs Set vs Object vs Map
pubDate: 2023-08-18
draft: false
description: While I'm knee deep in technical interviews, I thought I'd do a bit of a deep dive into these commonly misunderstood JavaScript data structures and provide a view on when you'd use one of the other.
heroImage: "./assets/collections.jpg"
imageCreditName: Karen Vardazaryan
imageCreditLink: https://unsplash.com/@bright?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
tags:
  - javascript
---

JavaScript provides a variety of data structures for storing data. However, developers often tend to use `Array`s and `Object`s to solve most problems without considering whether they are the appropriate data structure. The use of `Set`s instead of `Array`s and `Map`s instead of `Object`s can provide numerous benefits. This document provides a guide on how to use `Set` and `Map`, as well as the reasons why they should be considered over `Array`s and `Object`s.

## Array and Set

Consider a list of unique user IDs that gets appended to by some external operation. It would be more efficient to manage this list using a `Set` rather than an `Array` since a `Set` **doesn't allow duplicate items**. Below is an example of how `Set` works:

```jsx
const userIds = [1, 2, 3, 4, 4, 7];
const userIdSet = new Set(userIds);

console.log(userIds); // [ 1, 2, 3, 4, 4, 7 ]
console.log(userIdSet); // Set(5) { 1, 2, 3, 4, 7 }
```

### Adding Items

Adding a new item to an `Array` can be done using `push` to add items to the end of the `Array` or `unshift` to add them to the start of the `Array`. In terms of performance, using `push` appends an element to the end of the `Array` with **constant time complexity** or **O(1)**. If `unshift` is used, an element with an index of 0 is added and all the other elements are shifted by 1, resulting in **linear time complexity** or **O(n)**.

In contrast, `Set` only allows the `add` function to add an element to the end of the `Set`, providing it with **constant time complexity**.

```jsx
userIds.push(12);
userIds.unshift(17);

userIdSet.add(12);
userIdSet.add(17);

console.log(userIds); // [ 17, 1, 2, 3, 4, 4, 7, 12 ]
console.log(userIdSet); // Set { 1, 2, 3, 4, 7, 12, 17 }
```

### Accessing Items

Accessing values in `Array`s and `Set`s differs greatly due to how they are stored in memory. `Array`s are **indexed collections**, which means that they are stored sequentially by index. In contrast, `Set`s are **keyed collections** that use a hash table internally to store data using keys.

Therefore, `Array` elements can be accessed by index with **O(1)** time complexity. However, if we want to find an ID within the `Array`, we would have to iterate over the `Array` using `find` or `findIndex`, resulting in a time complexity of **O(n)**. If we want to know if the `Array` contains a certain ID value, we can use the `includes` function, which also iterates through all the items of the Array.

For `Set`s, we only have access to the `has` function, which produces the same result as the `includes` function in `Array`s. However, because it is a keyed collection, the `has` function has a **constant time complexity** or **O(1)**.

```jsx
console.log(userIds[6]); // 7
console.log(userIds.findIndex((id) => id === 7)); // 6

console.log(userIds.includes(7)); // true
console.log(userIdSet.has(7)); // true
```

### Removing Items

Removing an item from an `Array` can be done using `filter` to filter out the matching items or `splice` to remove the matching item by index. The former method only iterates through the items once with a time complexity of **O(n)**, while the latter method iterates through the items twice with a time complexity of **O(n<sup>2</sup>)**.

For a `Set`, we can simply use the `delete` function to remove the matching item, providing it with a time complexity of **O(1)** due to it being a keyed collection.

```jsx
function removeUserByIdSplice(id) {
  userIds.splice(
    userIds.findIndex((userId) => userId === id),
    1
  );
}

function removeUserByIdFilter(id) {
  userIds = userIds.filter((userId) => userId !== id);
}

function removeUserByIdSet(id) {
  userIdSet.delete(id);
}
```

### When Should You Use an Array Over a Set?

Although there are numerous reasons to use a `Set` over an `Array`, sometimes having duplicate items in a list is desirable. Additionally, `Array`s have many useful functions, such as `filter`, `map`, `sort`, and `reduce`, which allow us to perform operations on our collections.

Because a `Set` is iterable, it allows you to use the `for..of` construct or spread operator (`…`) to perform `Array`-like functions. Thus, you can easily convert a `Set` to an `Array` to make use of the additional functions an `Array` provides.

```jsx
// from set to array
console.log([...userIdSet]); // [ 1, 2, 3, 4, 7, 12, 17 ]
```

## Object and Map

While `Array`s and `Set`s are used to manage lists of data, `Object`s and `Map`s are used to manage key-value pairs. `Object`s are another example of a data structure that developers often overuse when they should consider using a `Map` instead. One of the main cases where you would want to consider using a `Map` over an `Object` is when keys are being added or deleted frequently.

You can easily instantiate a new `Map` based on an `Object` using the following code:

```jsx
const usersObject = {
  tim: { id: 12, city: "Perth" },
};
const usersMap = new Map(Object.entries(usersObject));

console.log(usersObject); // { tim: { id: 12, city: 'Perth' } }
console.log(usersMap); // Map(1) { 'tim' => { id: 12, city: 'Perth' } }
```

### Adding Key-Value Pairs

Adding to an `Object` or a `Map` has **constant time complexity**. However, there is a bit of a gotcha with the `Map` code below. If we run this in JavaScript, it wouldn't complain. However, we might notice that `henry` doesn't get added in the way we expect. Instead, it gets added as an object property to the `Map`, and hence it cannot be accessed using the `Map` `get` function.

```jsx
usersObject["henry"] = { id: 17, city: "Melbourne" };
usersMap["henry"] = { id: 17, city: "Melbourne" }; // 🚩

console.log(usersObject); // { tim: { id: 12, city: 'Perth' }, henry: { id: 17, city: 'Melbourne' } }
console.log(usersMap); // Map { 'tim' => { id: 12, city: 'Perth' }, henry: { id: 17, city: 'Melbourne' } }

console.log(usersMap.henry); // { id: 17, city: 'Melbourne' }
console.log(usersMap.get("henry")); // undefined
```

Instead, we must use the `set` function to add a key-value pair to a `Map`.

```jsx
usersMap.set("henry", { id: 17, city: "Melbourne" });

console.log(usersMap); // Map { 'tim' => { id: 12, city: 'Perth' }, 'henry' => { id: 17, city: 'Melbourne' } }
```

If we try to do something similar to an `Object` in TypeScript, we encounter issues with the `usersObject` because it infers the type when it is instantiated. To work around this, we need to define the type as `{ [key: string]: { id: number, city: string } }`.

```jsx
// TypeScript
const usersObject = {
  tim: { id: 12, city: "Perth" },
};
const usersMap = new Map(Object.entries(usersObject));

// 🚩 Property 'henry' does not exist on type '{ tim: { id: number; city: string; }; }'.
usersObject["henry"] = { id: 17, city: "Melbourne" };
usersMap.set("henry", { id: 17, city: "Melbourne" });
```

### Accessing Key-Value Pairs

Again, accessing key-value pairs has a **constant time complexity** for both `Object`s and `Map`s. The `get` function is used to access a value from within a `Map`.

```jsx
console.log(usersObject.henry); // { id: 17, city: 'Melbourne' }
console.log(usersMap.get("henry")); // { id: 17, city: 'Melbourne' }
```

### Removing Key-Value Pairs

The `delete` operator is one of my least understood operators in JavaScript, so I tend to avoid it. I came across this brilliant article on [Understanding delete](http://perfectionkills.com/understanding-delete/#delete_and_host_objects) that I highly recommend. Instead, when removing a property from an `Object`, I prefer to use the spread operator, as shown below.

```jsx
delete usersObject.henry; // OR const { henry, ...newUsersObject } = usersObject;
usersMap.delete("henry");

console.log(usersObject); // { tim: { id: 12, city: 'Perth' } }
console.log(usersMap); // Map { 'tim' => { id: 12, city: 'Perth' } }
```

Thankfully, `Map`s have it easy using the `delete` function.

If we are using TypeScript, we would encounter the following error when trying to use the `delete` function on an `Object` because it is inferring that `tim` is a required property of the `usersObject`.

```jsx
// TypeScript
const usersObject = {
  tim: { id: 12, city: "Perth" },
};

// 🚩 The operand of a 'delete' operator must be optional.
delete usersObject["tim"];
```

### Other reasons to consider using a Map

One of the interesting properties of a `Map` is that you're not restricted to using string values as keys, unlike with `Object`s. Therefore, you could have some additional metadata included in your keys.

```jsx
const userLocationMap = new Map();

const tim = { id: 12, firstName: "Tim", lastName: "Veletta" };
const henry = { id: 17, firstName: "Henry", lastName: "Jones" };

userLocationMap.set(tim, "Perth");
userLocationMap.set(henry, "Melbourne");

console.log(userLocationMap); // Map { { id: 12, firstName: 'Tim', lastName: 'Veletta' } => 'Perth', { id: 17, firstName: 'Henry', lastName: 'Jones' } => 'Melbourne' }

userLocationMap.get(tim); // 'Perth'
userLocationMap.get(henry); // 'Melbourne'
```

Another property of a `Map` that could be useful is that the order of elements is preserved based on the order of insertion. This is also true for `Object`s in later versions of the JavaScript standard. However, it is not guaranteed, so developers cannot rely on it. Like `Set`s, `Map`s are iterable, meaning they can use the `for..of` construct to iterate over the elements in the `Map`. Alternatively, the `forEach` function can be used to do this.

```jsx
for (let userLocation of userLocationMap) {
  console.log(userLocation); // [ { id: 12, firstName: 'Tim', lastName: 'Veletta' }, 'Perth' ] [ { id: 17, firstName: 'Henry', lastName: 'Jones' }, 'Melbourne' ]
}

userLocationMap.forEach((location, user) => {
  console.log(`${user.firstName} lives in ${location}`); // Tim lives in Perth Henry lives in Melbourne
});
```

Each of these operations has a time complexity of **O(n)** because we are only iterating over the items once. However, trying to do the same thing with `Object`s requires converting the `Object` to a list using either `Object.keys`, `Object.values`, or `Object.entries`, which, in itself, is an **O(n)** operation. If you then need to do something with each of the values, you end up iterating over the items again, resulting in a time complexity of **O(n<sup>2</sup>)**.

`Map` also has a handy `size` property, so you can always find out how many items are present. With an `Object`, you have to convert it to a list and get the `length` property from there.

Congratulations on making it this far! I hope you have learned more about Sets and Maps and will consider using them more in the future. Below are a few resources that were used in creating this post if you want to learn more.

[MDN - Objects vs Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)

[Time Complexities Of Common Array Operations In JavaScript](https://medium.com/@ashfaqueahsan61/time-complexities-of-common-array-operations-in-javascript-c11a6a65a168)

[Time Complexity of Objects and Arrays](https://tharinducs.medium.com/time-complexity-of-objects-and-arrays-js-algo-02-5cd8ead23b91)
