import { NetworkSelect } from './NetworkSelect'

const Header = () => {
  return (
    <>
      <div className="flex-grow-1">
        <h1>Simple Wallet Keeper</h1>
      </div>
      <div>
        <NetworkSelect />
      </div>
    </>
  )
}

export { Header }
