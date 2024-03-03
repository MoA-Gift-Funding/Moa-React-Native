import React, {Dispatch, SetStateAction, useState} from 'react';
import {Image, Modal, Pressable, SafeAreaView, View} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';
import TextRegular from '../text/TextRegular';
import useFunding from '../../hooks/fundings/useFunding';
import {throttle} from '../../utils/device';
import {useUserContext} from '../../contexts/UserContext';
import cls from 'classnames';
import {useForm} from 'react-hook-form';
import NextButton from './NextButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import LoadingBar from '../bar/LoadingBar';
import {MessageStatus} from '../../types/Funding';
import TextInputGroup from '../text/TextInputGroup';

const ReportTextBtn = ({
  state,
  setState,
  txt,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  txt: string;
}) => {
  return (
    <Pressable
      className={cls('w-[312px] h-[56px] flex justify-center rounded-lg mb-2', {
        'bg-Gray-08': state === txt,
        'bg-Gray-02': state !== txt,
      })}
      onPress={() => setState(txt)}>
      <TextSemiBold
        title={txt}
        style={cls(
          'ml-4',
          {'text-Gray-01': state === txt},
          {'text-Gray-06': state !== txt},
        )}
      />
    </Pressable>
  );
};

const ReportAndEditButton = ({
  domainId,
  domainType,
  memberId,
  message,
  messageId,
  visibility,
  setMsgUpdated,
}: {
  domainId: number;
  domainType: 'FUNDING' | 'FUNDING_MESSAGE';
  memberId?: number;
  message?: string;
  messageId?: number;
  visibility?: MessageStatus;
  setMsgUpdated?: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleReportModal = () => {
    setOnPressed(false);
    setOnReportModal(true);
  };
  const handleEditModal = () => {
    setOnPressed(false);
    setOnEditModal(true);
  };
  const {
    userState: {user},
  } = useUserContext();
  const [onReportModal, setOnReportModal] = useState(false);
  const [onEditModal, setOnEditModal] = useState(false);
  const [onPressed, setOnPressed] = useState(false);
  const [checked, setChecked] = useState(visibility === 'PRIVATE');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const {reportPostQuery} = useFunding();

  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({defaultValues: {message}});
  const {updateFundMessageQuery} = useFunding();
  const handleReport = async (content: string) => {
    if (!selectedContent) {
      return;
    }
    try {
      await reportPostQuery({domainId, domainType, content});
    } finally {
      setSelectedContent('');
      setOnReportModal(false);
    }
  };

  const handleUpdate = async data => {
    if (setMsgUpdated && messageId) {
      try {
        setIsLoading(true);
        updateFundMessageQuery({
          messageId,
          message: data.message,
          visibility: checked ? 'PRIVATE' : 'PUBLIC',
        });
      } finally {
        setIsLoading(false);
        setOnEditModal(false);
        setMsgUpdated(true);
      }
    }
  };
  return (
    <>
      <Pressable
        onPress={() => setOnPressed(true)}
        className="px-2 py-2 relative">
        <Image
          className="w-[4px] h-[16px]"
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1708353354/moa-dots_yl6uwc.png',
          }}
        />
      </Pressable>
      <Modal transparent={true} visible={onPressed}>
        <Pressable
          className="flex justify-end items-center flex-1 bg-Gray-08 opacity-70"
          onPress={() => setOnPressed(false)}
        />
        {domainType === 'FUNDING' && (
          <Pressable
            onPress={handleReportModal}
            className="w-full flex flex-row items-center justify-around  bg-white h-24">
            <TextRegular title="신고" style="text-Heading-4 text-Gray-10" />
          </Pressable>
        )}
        {domainType === 'FUNDING_MESSAGE' && (
          <>
            {memberId === user?.id && (
              <Pressable
                onPress={handleEditModal}
                className="w-full flex flex-row items-center justify-around bg-white h-20">
                <TextRegular title="수정" style="text-Heading-4 text-Gray-10" />
              </Pressable>
            )}
            <Pressable
              onPress={handleReportModal}
              className="w-full flex flex-row items-center justify-around bg-white h-20 border-t border-Gray-03">
              <TextRegular title="신고" style="text-Heading-4 text-Gray-10" />
            </Pressable>
          </>
        )}
      </Modal>
      <Modal visible={onEditModal} transparent={true} animationType="slide">
        <Pressable
          className="flex justify-center items-center flex-1 bg-Gray-08 opacity-70"
          onPress={() => setOnEditModal(false)}
        />
        <View className="h-fit bg-white flex items-center justify-center px-4 py-6">
          {isLoading && <LoadingBar />}
          <View className="w-[315px]">
            <TextInputGroup
              name="message"
              label="수정 메세지"
              placeholder={message}
              error={errors.message}
              control={control}
              autoFocus={true}
              custom="h-[150px]"
              multiline={true}
            />
            <Pressable
              onPress={() => setChecked(!checked)}
              className="flex flex-row items-center -mt-2 mb-6">
              {checked ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color="#212121"
                  size={20}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  color="#E0E0E0"
                  size={20}
                />
              )}
              <TextRegular
                title="친구만 볼 수 있게"
                style="text-Gray-06 text-Body-2 ml-2"
              />
            </Pressable>
            <NextButton
              title="수정하기"
              handleSubmit={handleSubmit}
              onSubmit={throttle(handleUpdate, 1000)}
            />
          </View>
        </View>
        <Pressable
          className="h-2/5 justify-center items-center bg-Gray-08 opacity-70"
          onPress={() => setOnEditModal(false)}
        />
      </Modal>
      <Modal visible={onReportModal} animationType="slide">
        <SafeAreaView className="h-full flex flex-col items-center justify-between">
          <View className="mt-10 flex flex-col justify-between">
            <View className="flex flex-col items-center">
              <TextSemiBold
                title={
                  domainType === 'FUNDING' ? '펀딩 신고하기' : '메세지 신고하기'
                }
                style="text-Heading-3 leading-Heading-3"
              />
              <TextRegular
                title="문제를 가장 잘 설명하는 옵션을 선택해주세요."
                style="text-Body-2 leading-Body-2"
              />
              <View className="flex flex-col mt-6">
                <ReportTextBtn
                  state={selectedContent}
                  setState={setSelectedContent}
                  txt="스팸"
                />
                <ReportTextBtn
                  state={selectedContent}
                  setState={setSelectedContent}
                  txt="학대나 괴롭힘"
                />
                <ReportTextBtn
                  state={selectedContent}
                  setState={setSelectedContent}
                  txt="해로운 허위 정보 및 폭력 미화"
                />
                <ReportTextBtn
                  state={selectedContent}
                  setState={setSelectedContent}
                  txt="기타"
                />
              </View>
            </View>
          </View>
          <View className="flex flex-row mb-4 items-center">
            <Pressable
              className="w-[110px] h-[56px] flex items-center justify-center bg-Gray-03 rounded-lg"
              onPress={() => {
                setSelectedContent('');
                setOnReportModal(false);
              }}>
              <TextSemiBold title="취소" style="text-Gray-07 text-Body-1" />
            </Pressable>
            <Pressable
              className="w-[210px] h-[56px] flex items-center justify-center bg-Gray-08 rounded-lg ml-2"
              onPress={throttle(() => handleReport(selectedContent), 1000)}>
              <TextSemiBold title="신고하기" style="text-Gray-02 text-Body-1" />
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ReportAndEditButton;
