import Container from '~/components/container';
import { cn } from 'common/lib/utils';
import { ListingCard } from '~/components/listings/listing-card';
import { useQuery } from 'common/hooks/useQuery';
import BannerSlider from '~/components/banner-slider';

export default function Home() {
    const { data } = useQuery('events');

    return (
        <>
            <BannerSlider />
            <Container>
                <div
                    className={cn(
                        'grid grid-cols-1 gap-8 pt-24',
                        'sm:grid-cols-2',
                        'md:grid-cols-3',
                        'lg:grid-cols-4',
                        'xl:grid-cols-5',
                        '2xl:grid-cols-6'
                    )}
                >
                    {data?.map((item) => (
                        <ListingCard key={item?.id} data={item} />
                    ))}
                </div>
            </Container>
        </>
    );
}
