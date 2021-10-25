import styled from 'styled-components/native';
export const Container = styled.TouchableOpacity`
  height: 100px;
  margin: 10px;
  background-color: #1f2d3d;
  flex-direction: row;
  border-radius: 10px;
  align-items: center;
`;

export const Name = styled.Text`
  margin-left: 20px;
  display: flex;
  font-size: 26px;
  width: 70%;
  color: #f0131e;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;
