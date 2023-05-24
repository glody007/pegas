import {
  Dialog,
  DialogContent,
  DialogContentFull,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SearchCoach } from "@/components/SearchCoach"
import { SellReserve } from "@/components/SellReserve"

export default function Home() {
  return (
    <>
      <SearchCoach />
      <div className="mt-4 flex-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Sell Ticket</Button>
          </DialogTrigger>
          <DialogContentFull>
            <DialogHeader>
              <DialogTitle className="pl-6">Sell Ticket</DialogTitle>
            </DialogHeader>
            <SellReserve />   
          </DialogContentFull>
        </Dialog>
      </div>
    </>
  )
}
