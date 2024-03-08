import Container from '~/components/container';
import { cn } from 'common/lib/utils';
import { ListingCard } from '~/components/listings/listing-card';
import { useQuery } from 'common/hooks/useQuery';
import BannerSlider from '~/components/banner-slider';
import ListingRecommend from '~/components/listings/listing-recommend';

export default function Home() {
    const { data } = useQuery('events');

    return (
        <>
            <BannerSlider />
            <main className="py-20">
                <Container>
                    <div>
                        <ListingRecommend />
                    </div>
                    <div className="flex flex-col gap-4 pt-16">
                        <h2 className="text-2xl font-semibold">
                            All events available right now
                        </h2>
                        <div
                            className={cn(
                                'grid grid-cols-1 gap-8',
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
                    </div>
                </Container>
            </main>
        </>
    );
}
