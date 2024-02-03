import TeamCard from '@/components/TeamCard'

const TeamList = ({cards, isBoard = false}) => {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-10 sm:px-0 lg:px-16 xl:px-48 mb-24">
            {
                cards.map((member, i) => <TeamCard key={i} card={member} isBoard={isBoard} />)
            }
        </div>
    )
}

export default TeamList