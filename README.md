# 9. 타입변환과 단축평가

## 9-1) 암묵적 타입 변환

조용히 이루어지는 암묵적 타입변환은 오류를 숨기고 분석하기 어렵게 하고, 오류가 있는 프로그램을 디버깅하기 어렵게 만든다.

- +[], +'', +null // 0
- 빈 객체와 빈 리스트는 truthy 이다!

[+]는 **문자병합**과 **덧셈**에 오버로딩되어 사용되어진다. 객체가 toString()과 valueOf()를 모두 가지고 있을 때, 어떤 메서드를 호출하게 될지 명확하지 않다. 데이터 형에 따라 메서드가 불리게 되는데, 암묵적 강제 형변환의 경우 데이터 타입이 실제로 주어지지 않는다. 그래서 자바스크립트는 내부적으로 valueOf를 실행한 후, toString을 실행하여 이 불확실성을 해소한다. 그러나 다음처럼 누군가 일부러 객체로 문자열 병합을 실행한다면, 예기치 않게 동작한다.

```javascript
var obj = {
  toString: function () {
    return '[object]';
  },
  valueOf: function () {
    return 17;
  },
};
'object: ' + obj; // 'object: 17'
```

valueOf는 객체가 실제로 숫자로 된 값을 가질 때 사용하는 것이 맞다! 이런 객체에서는 toString과 valueOf가 동일한 값의 숫자 표현을 일괄되게 반환해야한다.

> **Quiz**  
> [1] 1 + 2 + "3" = ?  
> [2] 1 + "2" + 3 = ?  
> [3] 객체도 원시타입으로 강제 변환 될 수 있을까? (O/X)  
> [4] isNaN 라이브러리 내에서도 암묵적인 형변환이 이뤄진다.  
> 테스트 전에 인자를 숫자로 바꾸기 때문에 완전한 신뢰가 어렵다.  
> 그렇다면 어떤 방법으로 테스트 하는 것이 가장 확실할까?

## 9-2) 명시적 타입 변환

**명시적 타입 변환의 방법**  
[1] new 없이 표준 빌트인 생성자 함수 사용  
[2] 암묵적 형변환 이용  
[3] 빌트인 메서드 활용

> **Quiz**
>
> ```javascript
> var s1 = new String('hi');
> var s2 = new String('hi');
> // [5], [6] 문제
> s1 === s2; // ?
> s1 == s2; // ?
> ```

문자열 타입 변환을 위해 사용하는 **toString 메서드**에는 문제가 있다.  
toString()으로 반환되는 문자열에 대한 요구사항이 ECMA script에 정의되어 있지 않다는 점이다.  
즉, 자바스크립트 엔진마다 반환되는 값이 다를 수 있다는 점을 알아두어야 한다.  
특히 함수를 toString()으로 추출할 시에, 함수의 내용을 담은 문자열을 만들어내지 않을 수 있다.(toString()을 구현시, 공백 문자 포매팅같은 것을 수행할 수도 있기 때문!)  
또한, toString으로 생성된 소스코드는 그 내부 변수 참조에 연관된 클러저의 값을 표현하지 못한다.

```javascript
(function (x) {
  return function (y) {
    return x + y;
  };
})(42).toString(); // "function(y) {\n     return x + y;\n}"
```

42로 바인딩하고 있음에도 변수 참조를 가지고 있음 => 클로저에 보관된 지역 변수 값 노출❌

## 9-3) 단축평가 & 옵셔널 체이닝 & null 병합 연산자

> **Quiz**  
> [7] 단축평가는 타입을 변환하지 않은 값을 반환한다. (O/X)
>
> ```javascript
> // [8]
> var str = null;
> var length = str?.length;
> console.log(length); // ?
>
> // [9]
> var foo = '' ?? 'hello';
> console.log(foo); // ?
> ```

# 10. 객체 리터럴

- 원시 타입: 단 하나의 값, 변경 불가 ❌
- 객체 타입: 여러 원시타입의 값을 하나의 단위로 구성한 복합적 자료 구조, 변경 👌🏻

> **Quiz**  
> [10] 객체의 property 키를 동적으로 사용할 수 있는 방법은?  
> [11] 만약 그 키를 중복으로 선언한다면?  
> [12] chrome에서 window.name을 출력한다면?

```javascript
// [13]
const person = {
  age: 10,
};
delete person.name; // 어떻게 되는가?
```

# 11. 원시 값과 객체의 비교

**원시 값**을 변수에 할당하면 **변수에는 실제 값**이 저장된다.  
**객체**를 변수에 할당하면, **변수에는 참조 값**이 저장된다.

```javascript
// Quiz [14]
var str = 'string';
str[0] = 'S';
console.log(str); // ?
```

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Moa-React-Native
