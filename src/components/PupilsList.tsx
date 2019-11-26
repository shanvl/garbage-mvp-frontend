import React, { FunctionComponent, useMemo, useCallback } from "react";
import { FlatList } from "react-native";
import PupilRow from "./PupilRow";
import Separator from "./Separator";
import { ActivityIndicator } from "react-native";
import { Pupil, Resource } from "../ducks/pupils/reducer";

const ROW_HEIGHT = 70;

export type OwnProps = {
  loading: boolean;
  onPull: () => void;
  onRowPress: (id: string, name: string) => void;
  pupils: Pupil[];
};

export type Props = OwnProps;

const PupilsList: FunctionComponent<Props> = ({ pupils, loading, onPull, onRowPress }) => {
  const badgesOrder: Resource[] = useMemo(() => ["plastic", "gadgets", "paper"], []);

  return (
    <FlatList
      style={styles.list}
      data={pupils}
      keyExtractor={item => item.id}
      extraData={loading}
      ItemSeparatorComponent={() => <Separator marginLeft={69} />}
      getItemLayout={(data, index) => ({
        length: ROW_HEIGHT,
        offset: ROW_HEIGHT * index,
        index,
      })}
      ListFooterComponent={() => {
        if (!loading) {
          return null;
        } else {
          return <ActivityIndicator animating size="large" />;
        }
      }}
      renderItem={({ item }) => {
        return <PupilRow onPress={onRowPress} {...item} height={ROW_HEIGHT} badgesOrder={badgesOrder} />;
      }}
      refreshing={loading}
      onRefresh={onPull}
    />
  );
};

const styles = {
  list: {
    flex: 1,
    width: "100%",
  },
};

export default PupilsList;
