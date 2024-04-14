import TeamCard from '@/components/TeamCard'

const TeamList = ({cards, isBoard = false}) => {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-8 gap-4 max-w-[60rem] w-full py-4 mx-auto">
            {
                cards.map((member, i) => <TeamCard key={i} card={member} isBoard={isBoard} />)
            }
        </div>
    )
}

export default TeamList