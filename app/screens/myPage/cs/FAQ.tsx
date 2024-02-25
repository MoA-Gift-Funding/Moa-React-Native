import React, {useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import ToggleListItem from './ToggleListItem';
import TextSemiBold from '../../../components/text/TextSemiBold';
import cls from 'classnames';
import useCS from '../../../hooks/cs/useCS';
import {categoryList} from '../../../types/CS';
import {useRefetchOnFocus} from '../../../hooks/handlers/useRefetchOnFocus';

const LabelButton = ({
  state,
  onPress,
  title,
}: {
  state: boolean;
  onPress: (str: string) => void;
  title: string;
}) => (
  <Pressable
    className={cls(
      'flex items-center justify-center h-[32px] px-2 rounded-md',
      {'bg-Main-01': state},
      {'bg-Sub-01': !state},
    )}
    onPress={() => onPress(`${title}`)}>
    <TextSemiBold
      title={categoryList[title]}
      style={state ? 'text-Body-2 text-white' : 'text-Body-2 text-Main-01'}
    />
  </Pressable>
);

const FAQ = () => {
  const [categories, setCategories] = useState({
    CREATE_FUNDING: false,
    PARTICIPATE_FUNDING: false,
    DELIVERY: false,
    CANCEL_REFUND: false,
    MEMBER: false,
    ETC: false,
  });
  const handlePress = (name: string) => {
    if (categories[name] === true) {
      return setCategories({
        CREATE_FUNDING: false,
        PARTICIPATE_FUNDING: false,
        DELIVERY: false,
        CANCEL_REFUND: false,
        MEMBER: false,
        ETC: false,
      });
    }
    setCategories({
      CREATE_FUNDING: false,
      PARTICIPATE_FUNDING: false,
      DELIVERY: false,
      CANCEL_REFUND: false,
      MEMBER: false,
      ETC: false,
      [name]: true,
    });
  };
  const {
    CREATE_FUNDING,
    PARTICIPATE_FUNDING,
    DELIVERY,
    CANCEL_REFUND,
    MEMBER,
    ETC,
  } = categories;
  const {faqsQuery, refetchFaqQuery} = useCS();
  useRefetchOnFocus(refetchFaqQuery);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex flex-row flex-wrap p-4 gap-2">
        <View>
          <LabelButton
            title="CREATE_FUNDING"
            state={CREATE_FUNDING}
            onPress={handlePress}
          />
        </View>
        <View>
          <LabelButton
            title="PARTICIPATE_FUNDING"
            state={PARTICIPATE_FUNDING}
            onPress={handlePress}
          />
        </View>
        <View>
          <LabelButton
            title="DELIVERY"
            state={DELIVERY}
            onPress={handlePress}
          />
        </View>
        <View>
          <LabelButton
            title="CANCEL_REFUND"
            state={CANCEL_REFUND}
            onPress={handlePress}
          />
        </View>
        <View>
          <LabelButton title="MEMBER" state={MEMBER} onPress={handlePress} />
        </View>
        <View>
          <LabelButton title="ETC" state={ETC} onPress={handlePress} />
        </View>
      </View>
      {faqsQuery && (
        <>
          {CREATE_FUNDING &&
            faqsQuery
              .filter(faq => faq.category === 'CREATE_FUNDING')
              .map(faq => (
                <ToggleListItem
                  title={faq.content}
                  label={categoryList[faq.category]}
                  category="고객센터 답변"
                  content={faq.answer}
                />
              ))}
          {PARTICIPATE_FUNDING &&
            faqsQuery
              .filter(faq => faq.category === 'PARTICIPATE_FUNDING')
              .map(faq => (
                <ToggleListItem
                  title={faq.content}
                  label={categoryList[faq.category]}
                  category="고객센터 답변"
                  content={faq.answer}
                />
              ))}
          {DELIVERY &&
            faqsQuery
              .filter(faq => faq.category === 'DELIVERY')
              .map(faq => (
                <ToggleListItem
                  title={faq.content}
                  label={categoryList[faq.category]}
                  category="고객센터 답변"
                  content={faq.answer}
                />
              ))}
          {CANCEL_REFUND &&
            faqsQuery
              .filter(faq => faq.category === 'CANCEL_REFUND')
              .map(faq => (
                <ToggleListItem
                  title={faq.content}
                  label={categoryList[faq.category]}
                  category="고객센터 답변"
                  content={faq.answer}
                />
              ))}
          {MEMBER &&
            faqsQuery
              .filter(faq => faq.category === 'MEMBER')
              .map(faq => (
                <ToggleListItem
                  title={faq.content}
                  label={categoryList[faq.category]}
                  category="고객센터 답변"
                  content={faq.answer}
                />
              ))}
          {ETC &&
            faqsQuery
              .filter(faq => faq.category === 'ETC')
              .map(faq => (
                <ToggleListItem
                  title={faq.content}
                  label={categoryList[faq.category]}
                  category="고객센터 답변"
                  content={faq.answer}
                />
              ))}
          {!CREATE_FUNDING &&
            !PARTICIPATE_FUNDING &&
            !DELIVERY &&
            !CANCEL_REFUND &&
            !MEMBER &&
            !ETC &&
            faqsQuery.map(faq => (
              <ToggleListItem
                title={faq.content}
                label={categoryList[faq.category]}
                category="고객센터 답변"
                content={faq.answer}
              />
            ))}
        </>
      )}
    </ScrollView>
  );
};

export default FAQ;
