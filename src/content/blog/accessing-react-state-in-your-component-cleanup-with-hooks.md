---
title: Accessing React state in your component cleanup with hooks
pubDate: 2020-07-13
draft: false
description: I came across an interesting problem where I needed to access a
  piece of React state when unmounting a component, a problem that would have
  been trivial with Class components and componentWillUnmount, however with
  hooks, the solution was less clear.
prevUrl: /blog/2020-07-14-accessing-react-state-in-your-component-cleanup-with-hooks/
heroImage: "./assets/react-cleanup.jpg"
imageCreditName: Sigmund
imageCreditLink: https://unsplash.com/@sigmund?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
tags:
  - React
---

Today I came across an interesting problem where I needed to access a piece of React state when unmounting a component, a problem that would have been trivial with Class components and `componentWillUnmount`, however with hooks, the solution was less clear.

If you're just looking for the solution here it is; I will be diving into it below to try and understand it a bit better.

```javascript
const [value, setValue] = useState();
const valueRef = useRef();

useEffect(() => {
  valueRef.current = value;
}, [value]);

useEffect(() => {
  return function cleanup() {
    console.log(valueRef.current);
  };
}, []);
```

## `useEffect`

The `useEffect` hook allows you to perform side-effects in your components when something happens, for instance when the component is first rendered, when a property or piece of state is updated, or when the component is about to be unmounted.

The `useEffect` hook is defined as follows:

```javascript
useEffect(effectFunction: React.EffectCallback, dependencies?: React.DependencyList | undefined)

// for example
useEffect(() => {
    console.log(value);
}, [value]);
```

In this example, the `value` will be output to the console every time it changes including when it is initialised.

The dependency list passed into `useEffect` is particularly interesting; whenever _one of the variables in that array changes_, the _effect function will be run_. If we omit the dependency list, the function will run both _after the first render_ and _after every update_. If we instead pass in an empty dependency list, the function _will only be run when the component is initialised_.

We can also return a function from `useEffect` that can _cleanup_ any side effects, for instance, we may want to unsubscribe from an external data source to prevent possible memory leaks. If we choose to include some variables in our dependency array or omit it entirely, the cleanup function will be run on each update to clean up effects from the previous render as well as when the component unmounts.

If we _only_ want to run the cleanup function when the component unmounts, we set the dependency array to `[]`.

Our solution makes use of 2 `useEffect` statements, one to output the `value` to the console **only when the component is to be unmounted** and the other to update the `valueRef` with the current `value`.

## `useRef`

The `useRef` hook creates a `ref` which has 2 main use cases, to access a child component outside of the usual `props` flow or to store a mutable value that exists for the lifetime of the component. In our case, we use the latter.

A `ref` is a generic container that can store a value using its `current` property similar to using instance variables in object oriented programming. It is different from _state_ since it does not cause a _rerender_ when it is updated.

Since the `ref` is mutable and exists for the lifetime of the component, we can use it to store the current `value` whenever it is updated and still access that `value` in the _cleanup_ function of our `useEffect` via the `valueRef`.

## Further Resources

[Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)

[Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

[Is there something like instance variables?](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)
