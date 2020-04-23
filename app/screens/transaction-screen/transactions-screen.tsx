import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SectionList, Text, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, TransactionRow, UserHeader } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

export interface TransactionsScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.charcoal,
}

const SECTION: TextStyle = {
  backgroundColor: color.palette.lightGrey,
  color: color.palette.offWhite,
  fontSize: 20,
  paddingLeft: spacing[2]
}

const useAsyncUserTransactions = () => {
  const { userStore, transactionStore } = useStores()
  // set initial state
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    if (!loading) return

    const loadAsync = async () => {
      // reset loading to true at start of the async call
      setLoading(true)
      await userStore.getUser()
        .then(() => setCurrentUser(userStore.currentUser))
        // sort the transactions in descending order so the latest transaction is at the top
        .then(() => setData(transactionStore.formatForSectionsByYear()))
        .catch((e) => console.tron.error(e.message, e.stack))
        // ensure we stop loading when call is finished regardless of success/fail
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
  return (
    <Screen style={ROOT} preset="fixed">
      <UserHeader user={currentUser} />
      <SectionList
        keyExtractor={(item) => item.id}
        sections={data}
        refreshing={loading}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={SECTION}>{title}</Text>
        )}
        stickySectionHeadersEnabled
      />
    </Screen>
  )
})
