# 🧑🏻‍💻 페이지별 기능·기술
## ReactNative 위의 react query 사용
- 서비스 내의 스토어는 데이터가 자주 변하는 구조가 아니기에 **캐싱**과 간편한 **상태관리**   
- 펀딩, 친구, 스토어 리스트에서 **무한 스크롤**의 사용과, **ErrorBoundary, Suspense** 사용을 위해 리액트쿼리를 사용했습니다.   
- onSuccess, onError를 사용해 **낙관적 업데이트**를 하기도 편리합니다.

<br />

> 🧐 **리액트 쿼리를 적용하며 마주한 기술적 문제점**   
> - <a href="https://blog.thelumayi.com/98" target="_blank">RN에서 react-query refetch가 안되는 문제와 해결 방법</a>

<br/>

## 많은 TextInput을 처리하기 위한 react-hook-form
- 한 페이지에 TextInput이 3개 이상인 화면이 많아 **state 관리가 복잡**해졌고, **기획이 자주 변경되어 HeadlessUI의 필요성**이 커졌습니다.
- 유효성 검사도 가능하며, 추후 **타입안정성을 위해 도입하고 싶었던 zod**와도 궁합이 좋았기에 react-hook-form을 사용했습니다.

> 🧐 **TextInput과 관련해 고민한 것들**   
> - <a href="" target="_blank">많은 TextInput을 제대로 관리하기(react-hook-form)</a>    
> - <a href="" target="_blank">react-hook-form에 zod를 굳이 더하는 이유</a>

<br />

## OS별 Notification 와 DeepLink

- **Notifee**와 **Firebase**를 사용하여 Notification, Dynamic Link를 구현했습니다.
- DeepLink에 따른 navigation을 **NavigationContainer의 linking**으로 관리했습니다.
- DeepLink로는 앱이 다운로드가 되어있지 않았을 때, 앱을 열 수 없었기에, **Dynamic Link**를 사용해 앱이 없을시엔 스토어로 가도록 처리했습니다.
- 연동 과정에서 OS별 트러블 슈팅과정을 블로그에 정리했습니다.

> 🧐 **DeepLink과 관련해 고민한 것들**   
> - <a href="" target="_blank">[RN] Notification과 DeepLink를 한 곳에서 처리하기</a>    
> - <a href="" target="_blank">[RN] Universal Link로 앱을 공유하기</a>

<br />

## ReactNative 테스팅
- 서비스 로직을 클래스로 관리하고, 객체지향적으로 분리하여 테스팅하기 수월하게 했습니다.
- Sentry, Detox를 사용하여 E2E테스트를 작성했습니다.

> 🧐 **테스팅과 관련해 고민한 것들**   
> - <a href="" target="_blank">[RN] E2E테스팅 라이브러리 비교- Sentry, Appium, Detox, Maestro</a>    
> - <a href="" target="_blank">[번역] React Native Testing</a>

<br />

# 🧐 모아 서비스에 대한 고민들이 담겨있는 블로그
- [React Native에서 웹뷰(react-native-webview)를 사용할 때, 고려해야할 것들](https://blog.thelumayi.com/95)
- [[Agile, StoryPoint] 일정을 추정하는 것이란 얼마나 어려운 일인가](https://blog.thelumayi.com/91)
- [[RN] Codepush 또는 AppVersion 확인 후 스토어 이동]()
- [[RN] App 번들사이즈 줄이기]()
- [MoA AWS 아키텍처 구조 → SAA 자격증 취득]()
- [창업하기 전, 고려해야할 것들- aka 모아가 배포되지 못한 이유](https://blog.thelumayi.com/99)


<br />

# 🎁 서비스 맛보기

<img src="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1710343868/moa-flow_3_yug7p9.png"/>
<img src="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1710343966/moa-flow_4_ks4i3q.png"/>
