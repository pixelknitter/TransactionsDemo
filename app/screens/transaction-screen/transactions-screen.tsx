import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, TransactionRow, UserHeader } from "../../components"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"

export interface TransactionsScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.charcoal,
}

const useAsyncUserTransactions = () => {
  const { userStore, transactionStore } = useStores()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    if (!loading) return

    const loadAsync = async () => {
      await userStore.getUser()
        .then(() => setCurrentUser(userStore.currentUser))
        .then(() => setData(transactionStore.transactions))
        .catch((e) => console.tron.error(e.message, e.stack))
        .finally(() => setLoading(false))
    }

    loadAsync()
  }, [loading])

  return {
    data,
    currentUser,
    loading
  }
}

export const TransactionsScreen: React.FunctionComponent<TransactionsScreenProps> = observer(() => {
  const { data, currentUser, loading } = useAsyncUserTransactions()
  console.tron.log(`loading is: ${loading}`)
  return (
    <Screen style={ROOT} preset="scroll">
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        refreshing={loading}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
        ListHeaderComponent={() => <UserHeader user={currentUser} />}
        stickyHeaderIndices={[0]}
      />
    </Screen>
  )
})
