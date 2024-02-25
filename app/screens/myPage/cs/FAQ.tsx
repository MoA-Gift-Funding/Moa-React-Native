import React, {useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import ToggleListItem from './ToggleListItem';
import TextSemiBold from '../../../components/text/TextSemiBold';
import cls from 'classnames';

const FAQ = () => {
  const [categories, setCategories] = useState({
    frequent: true,
    createFund: false,
    joinFund: false,
    shipping: false,
    cancel: false,
    user: false,
    inquiry: false,
  });
  const handlePress = name => {
    setCategories({
      frequent: false,
      createFund: false,
      joinFund: false,
      shipping: false,
      cancel: false,
      user: false,
      inquiry: false,
      [name]: true,
    });
  };
  const {frequent, createFund, joinFund, shipping, cancel, user, inquiry} =
    categories;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex flex-row flex-wrap p-4 gap-2">
        <Pressable
          className={cls(
            'flex items-center justify-center h-[32px] px-2 rounded-md',
            {'bg-Main-01': createFund},
            {'bg-Sub-01': !createFund},
          )}
          onPress={() => handlePress('createFund')}>
          <TextSemiBold
            title="펀딩 개설"
            style={
              createFund ? 'text-Body-2 text-white' : 'text-Body-2 text-Main-01'
            }
          />
        </Pressable>
        <Pressable
          className={cls(
            'flex items-center justify-center h-[32px] px-2 rounded-md',
            {'bg-Main-01': cancel},
            {'bg-Sub-01': !cancel},
          )}
          onPress={() => handlePress('cancel')}>
          <TextSemiBold
            title="취소/환불"
            style={
              cancel ? 'text-Body-2 text-white' : 'text-Body-2 text-Main-01'
            }
          />
        </Pressable>
      </View>

      <ToggleListItem
        title="펀딩 개설은 어떻게 하나요?"
        label="펀딩개설"
        category="고객센터 답변"
        content="할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다."
      />
      <ToggleListItem
        title="펀딩 개설은 어떻게 하나요?"
        label="펀딩개설"
        category="고객센터 답변"
        content="할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다."
      />
      <ToggleListItem
        title="펀딩 개설은 어떻게 하나요?"
        label="펀딩개설"
        category="고객센터 답변"
        content="할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다."
      />
      <ToggleListItem
        title="펀딩 개설은 어떻게 하나요?"
        label="펀딩개설"
        category="고객센터 답변"
        content="할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다."
      />
      <ToggleListItem
        title="펀딩 개설은 어떻게 하나요?"
        label="펀딩개설"
        category="고객센터 답변"
        content="할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다."
      />
      <ToggleListItem
        title="펀딩 개설은 어떻게 하나요?"
        label="펀딩개설"
        category="고객센터 답변"
        content="할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다."
      />
    </ScrollView>
  );
};

export default FAQ;
