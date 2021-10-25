import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #312e38;
  padding: 10px;
`;

export const Name = styled.Text`
  margin-left: 10px;
  display: flex;
  font-size: 26px;
  width: 70%;
  color: #f0131e;
`;

export const NameBox = styled.View`
  flex-direction: row;
`;

export const Description = styled.Text`
  margin: 20px;
  width: 80%;
  display: flex;
  font-size: 16px;
  color: #f0131e;
`;

export const DescriptionBox = styled.View`
  max-height: 30%;
  flex-direction: row;
  align-items: flex-end;
`;

export const OtherInfo = styled.Text`
  margin: 10px;
  display: flex;
  font-size: 22px;
  color: #f0131e;
`;

export const Image = styled.Image`
  width: 100%;
  height: 260px;
  border-radius: 10px;
`;

export const EditButton = styled.TouchableOpacity`
  height: 20px;

  margin-top: 10px;
  margin-right: 10px;
  place-content: center;
  background-color: #1f2d3d;
`;

export const ButtonText = styled.Text`
  display: flex;
  font-size: 12px;
  color: #f0131e;
`;

export const Flex = styled.View`
  flex: 1;
`;

export const NameBar = styled.TextInput`
  height: 40px;
  width: 70%;

  margin-left: 10px;
  font-size: 26px;

  padding: 4px;
  border-radius: 20px;
  background-color: #312e40;
  color: #f0131e;
`;

export const DescriptionBar = styled.TextInput`
  height: 60px;
  width: 70%;

  margin-left: 10px;
  font-size: 16px;
  padding: 4px;
  border-radius: 20px;
  background-color: #312e40;
  color: #f0131e;
`;

export const EditDescriptionButton = styled.TouchableOpacity`
  height: 20px;

  margin-top: -10px;
  margin-right: 10px;
  place-content: center;
  background-color: #1f2d3d;
`;

export const CancelButton = styled.TouchableOpacity`
  height: 20px;

  margin-top: -10px;
  margin-right: 10px;
  place-content: center;
  background-color: #1f2d3d;
`;

export const Errored = styled.Text`
  margin-left: 10px;
  width: 56%;
  font-size: 16px;
  padding: 4px;
  border-radius: 20px;
  background-color: #000000;
  color: #f0131e;
`;
